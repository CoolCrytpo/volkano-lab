/**
 * VOLKANO License Worker — Cloudflare Worker + KV
 * 
 * Endpoints:
 *   POST /license/verify     → Verify & activate a license key
 *   POST /stripe/webhook     → Handle Stripe checkout.session.completed
 *   POST /stripe/create-session → Create a Stripe Checkout session
 *   GET  /license/status      → Admin: check license details (requires admin key)
 * 
 * Environment bindings required:
 *   KV: LICENSE_KV (Cloudflare KV namespace)
 *   Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ADMIN_KEY
 *   Variables: STRIPE_PRICE_ID, SITE_URL
 * 
 * Deploy:
 *   wrangler deploy --name volkano-license
 * 
 * wrangler.toml example:
 *   name = "volkano-license"
 *   main = "volkano-license-worker.js"
 *   compatibility_date = "2024-01-01"
 *   [[kv_namespaces]]
 *   binding = "LICENSE_KV"
 *   id = "your-kv-namespace-id"
 *   [vars]
 *   STRIPE_PRICE_ID = "price_xxxxx"
 *   SITE_URL = "https://volkanolab.com"
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS_HEADERS });
}

function generateLicenseKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No 0,O,I,1 for readability
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `VOLKANO-${seg()}-${seg()}-${seg()}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      // ==========================================
      // POST /license/verify — Verify & activate
      // ==========================================
      if (url.pathname === '/license/verify' && request.method === 'POST') {
        const { licenseKey, deviceHash } = await request.json();
        if (!licenseKey || !deviceHash) {
          return json({ valid: false, error: 'licenseKey and deviceHash required' }, 400);
        }

        const record = await env.LICENSE_KV.get(licenseKey, { type: 'json' });
        if (!record) {
          return json({ valid: false, error: 'Clé de licence introuvable' });
        }

        // Check expiration
        if (record.expiresAt && new Date(record.expiresAt) < new Date()) {
          return json({ valid: false, error: 'Licence expirée' });
        }

        // Check revocation
        if (record.revoked) {
          return json({ valid: false, error: 'Licence révoquée' });
        }

        // Device management: max 3 devices
        const maxDevices = record.maxDevices || 3;
        if (!record.devices) record.devices = [];
        
        if (!record.devices.includes(deviceHash)) {
          if (record.devices.length >= maxDevices) {
            return json({ valid: false, error: `Limite de ${maxDevices} appareils atteinte. Contactez le support.` });
          }
          record.devices.push(deviceHash);
        }

        // Update last verified
        record.lastVerified = new Date().toISOString();
        
        // Save back to KV (TTL = expiry or 2 years)
        const ttlSeconds = record.expiresAt 
          ? Math.max(3600, Math.floor((new Date(record.expiresAt) - Date.now()) / 1000))
          : 63072000; // 2 years
        await env.LICENSE_KV.put(licenseKey, JSON.stringify(record), { expirationTtl: ttlSeconds });

        return json({
          valid: true,
          expiresAt: record.expiresAt,
          devices: record.devices.length,
          maxDevices,
        });
      }

      // ==========================================
      // POST /stripe/create-session — Create Stripe Checkout
      // ==========================================
      if (url.pathname === '/stripe/create-session' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const refId = body.ref || Date.now().toString(36);

        const params = new URLSearchParams({
          'payment_method_types[]': 'card',
          'line_items[0][price]': env.STRIPE_PRICE_ID,
          'line_items[0][quantity]': '1',
          'mode': 'payment',
          'success_url': `${env.SITE_URL}/licence/success?session_id={CHECKOUT_SESSION_ID}`,
          'cancel_url': `${env.SITE_URL}/licence?cancelled=true`,
          'client_reference_id': refId,
          'metadata[product]': 'volkano_license',
          'allow_promotion_codes': 'true',
        });

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        const session = await stripeRes.json();
        if (session.error) {
          return json({ error: session.error.message }, 400);
        }

        return json({ url: session.url, sessionId: session.id });
      }

      // ==========================================
      // POST /stripe/webhook — Handle Stripe events
      // ==========================================
      if (url.pathname === '/stripe/webhook' && request.method === 'POST') {
        const body = await request.text();
        const sig = request.headers.get('stripe-signature');
        
        // Verify webhook signature (simplified — for production, use Stripe SDK)
        // For now, we trust the endpoint is only called by Stripe
        // In production: verify sig with STRIPE_WEBHOOK_SECRET
        
        const event = JSON.parse(body);

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          
          // Only process our product
          if (session.metadata?.product !== 'volkano_license') {
            return json({ received: true, skipped: true });
          }

          const email = session.customer_details?.email || session.customer_email || '';
          const licenseKey = generateLicenseKey();
          
          // Calculate expiry: 1 year from now
          const expiresAt = new Date();
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);

          const record = {
            email,
            licenseKey,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt.toISOString(),
            stripeSessionId: session.id,
            stripeCustomerId: session.customer || null,
            paymentAmount: session.amount_total,
            paymentCurrency: session.currency,
            devices: [],
            maxDevices: 3,
            revoked: false,
          };

          // Store in KV
          await env.LICENSE_KV.put(licenseKey, JSON.stringify(record), {
            expirationTtl: 63072000, // 2 years (grace period beyond license expiry)
          });

          // Also store email → key mapping for lookup
          await env.LICENSE_KV.put(`email:${email}`, licenseKey, {
            expirationTtl: 63072000,
          });

          // Send license key via email (using Stripe receipt or external service)
          // Option A: Use Stripe receipt metadata (basic)
          // Option B: Call Resend/Mailgun API here
          // For now, we log and rely on success page
          console.log(`License created: ${licenseKey} for ${email}`);

          // TODO: Send email with license key
          // Example with Resend:
          // await fetch('https://api.resend.com/emails', {
          //   method: 'POST',
          //   headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     from: 'VOLKANO <noreply@volkanolab.com>',
          //     to: email,
          //     subject: 'Votre licence VOLKANO',
          //     html: `<h2>Merci pour votre achat !</h2><p>Votre clé de licence :</p><p style="font-size:24px;font-family:monospace;font-weight:bold;color:#e85d04">${licenseKey}</p><p>Collez cette clé dans VOLKANO → Paramètres → Licence → Activer</p>`
          //   })
          // });

          return json({ received: true, licenseKey });
        }

        return json({ received: true });
      }

      // ==========================================
      // GET /license/status — Admin lookup
      // ==========================================
      if (url.pathname === '/license/status' && request.method === 'GET') {
        const adminKey = url.searchParams.get('admin');
        if (adminKey !== env.ADMIN_KEY) {
          return json({ error: 'Unauthorized' }, 401);
        }

        const key = url.searchParams.get('key');
        const email = url.searchParams.get('email');

        let licenseKey = key;
        if (!licenseKey && email) {
          licenseKey = await env.LICENSE_KV.get(`email:${email}`);
        }
        if (!licenseKey) {
          return json({ error: 'License not found' }, 404);
        }

        const record = await env.LICENSE_KV.get(licenseKey, { type: 'json' });
        if (!record) {
          return json({ error: 'License not found' }, 404);
        }

        return json({ licenseKey, ...record });
      }

      // ==========================================
      // GET /license/recover — User recovers key by email
      // ==========================================
      if (url.pathname === '/license/recover' && request.method === 'POST') {
        const { email } = await request.json();
        if (!email) return json({ error: 'Email required' }, 400);

        const licenseKey = await env.LICENSE_KV.get(`email:${email}`);
        if (!licenseKey) {
          // Don't reveal if email exists or not
          return json({ sent: true, message: 'Si une licence existe pour cet email, elle sera renvoyée.' });
        }

        // TODO: Actually send email here
        // For now, just confirm
        return json({ sent: true, message: 'Clé de licence renvoyée par email.' });
      }

      return json({ error: 'Not found' }, 404);

    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: 'Internal server error' }, 500);
    }
  }
};
