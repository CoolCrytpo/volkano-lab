// VOLKANO Service Worker — v1.0
// Offline-first caching strategy

const CACHE_NAME = 'volkano-v1';
const CDN_CACHE = 'volkano-cdn-v1';

// App shell — always cached
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-maskable.svg',
];

// CDN libraries to cache
const CDN_LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
];

// Install: cache shell & CDN libs
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL).catch(() => {})),
      caches.open(CDN_CACHE).then(cache =>
        Promise.all(CDN_LIBS.map(url =>
          cache.add(url).catch(() => {}) // Fail silently — CDN may block SW requests
        ))
      ),
    ]).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - API calls (CoinGecko, License, GoldRush) → Network first, no cache
// - Google Fonts → Cache first
// - CDN libs → Cache first, network fallback
// - App shell → Cache first, network fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API calls — always network, no caching
  const isAPI = [
    'api.coingecko.com',
    'api.goldrush.dev',
    'license.volkano.workers.dev',
    'api.stripe.com',
  ].some(host => url.hostname.includes(host));

  if (isAPI) {
    event.respondWith(fetch(event.request).catch(() =>
      new Response(JSON.stringify({ error: 'Hors ligne' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      })
    ));
    return;
  }

  // Google Fonts — cache first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open('volkano-fonts-v1').then(cache =>
        cache.match(event.request).then(cached =>
          cached || fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          })
        )
      ).catch(() => fetch(event.request))
    );
    return;
  }

  // CDN libs — cache first
  if (url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached =>
          cached || fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          })
        )
      ).catch(() => fetch(event.request))
    );
    return;
  }

  // App shell — cache first, network fallback
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(res => {
          if (res.ok) cache.put(event.request, res.clone());
          return res;
        }).catch(() => null);

        return cached || networkFetch || new Response('Hors ligne', { status: 503 });
      })
    )
  );
});

// Background sync: send queued license checks when back online
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
