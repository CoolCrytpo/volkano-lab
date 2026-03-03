# 💳 Configuration Stripe - Guide Complet

Ce guide vous explique comment configurer **Stripe** pour accepter des paiements en euros (EUR) et en stablecoins (USDC).

---

## 📋 Table des matières

1. [Créer un compte Stripe](#créer-un-compte-stripe)
2. [Récupérer vos clés API](#récupérer-vos-clés-api)
3. [Tester en mode Sandbox](#tester-en-mode-sandbox)
4. [Créer des produits](#créer-des-produits)
5. [Passer en mode Production](#passer-en-mode-production)
6. [Accepter les paiements Crypto](#accepter-les-paiements-crypto)

---

## 🔧 Créer un compte Stripe

### Étape 1 : Inscription

1. Allez sur [stripe.com](https://stripe.com)
2. Cliquez sur **"Commencer"** ou **"Sign up"**
3. Entrez votre adresse email
4. Créez un mot de passe

### Étape 2 : Informations de l'entreprise

Remplissez les informations demandées :
- **Nom de l'entreprise** : Volkano Lab
- **Pays** : France
- **Adresse** : Votre adresse
- **Téléphone** : Votre numéro

### Étape 3 : Vérification d'identité

Stripe vous demandera de vérifier votre identité. Suivez les instructions à l'écran.

---

## 🔑 Récupérer vos clés API

### Localiser vos clés

1. Connectez-vous à votre [Dashboard Stripe](https://dashboard.stripe.com)
2. Allez dans **Paramètres** → **Clés API** (ou **Settings** → **API Keys**)
3. Vous verrez deux sections : **Clés de test** et **Clés de production**

### Clés de test (pour développement)

Commencez par utiliser les **clés de test** :

- **Clé publique** : Commence par `pk_test_`
- **Clé secrète** : Commence par `sk_test_`

**⚠️ Ne partagez JAMAIS votre clé secrète !**

### Copier vos clés

1. Cliquez sur l'icône "Copier" à côté de chaque clé
2. Collez-les dans votre fichier `.env` :

```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

---

## 🧪 Tester en mode Sandbox

### Numéros de carte de test

Stripe fournit des numéros de carte fictifs pour tester :

| Cas | Numéro de carte | Résultat |
|-----|-----------------|----------|
| Paiement réussi | `4242 4242 4242 4242` | ✅ Accepté |
| Carte refusée | `4000 0000 0000 0002` | ❌ Refusé |
| Authentification 3D Secure | `4000 0025 0000 3155` | 🔐 Demande 3DS |

### Détails de test

- **Expiration** : N'importe quelle date future (ex: 12/25)
- **CVC** : N'importe quel code à 3 chiffres (ex: 123)
- **Nom** : N'importe quel nom

### Tester un paiement

1. Allez sur votre site : `https://volkano-lab.onrender.com`
2. Cliquez sur "Acheter" pour un outil payant
3. Entrez les informations de test
4. Cliquez sur "Payer"

### Vérifier la transaction

1. Allez dans votre [Dashboard Stripe](https://dashboard.stripe.com)
2. Cliquez sur **Paiements** (ou **Payments**)
3. Vous devriez voir votre transaction de test

---

## 🛍️ Créer des produits

### Étape 1 : Accéder à la section Produits

1. Dans votre Dashboard Stripe, cliquez sur **Produits** (ou **Products**)
2. Cliquez sur **Créer un produit** (ou **Create product**)

### Étape 2 : Remplir les informations

- **Nom** : Le nom de votre outil/article (ex: "Simulateur ROI IA")
- **Description** : Une courte description (optionnel)
- **Image** : Téléchargez une image (optionnel)

### Étape 3 : Ajouter un prix

- **Devise** : EUR (euros)
- **Prix** : Le montant en euros (ex: 29.99)
- **Modèle de facturation** : One-time (paiement unique)

### Étape 4 : Créer le produit

Cliquez sur **Créer un produit**.

### Étape 5 : Récupérer l'ID du produit

1. Allez dans **Produits** → Sélectionnez votre produit
2. Copiez l'**ID du produit** (commence par `prod_`)
3. Collez-le dans votre dashboard admin Keystatic

---

## 🚀 Passer en mode Production

### Quand passer en production ?

- ✅ Vous avez testé plusieurs paiements
- ✅ Votre site est en ligne
- ✅ Vous êtes sûr de votre configuration

### Étapes pour passer en production

1. Dans votre Dashboard Stripe, allez dans **Paramètres** → **Clés API**
2. Cliquez sur **Activer les clés de production** (ou **Reveal live keys**)
3. Copiez vos **clés de production** :
   - **Clé publique** : Commence par `pk_live_`
   - **Clé secrète** : Commence par `sk_live_`

4. Mettez à jour vos variables d'environnement sur Render :
   - Remplacez `pk_test_` par `pk_live_`
   - Remplacez `sk_test_` par `sk_live_`

5. Render va redéployer automatiquement

### ⚠️ Important

Une fois en production, **les vrais paiements** seront acceptés. Assurez-vous que :
- Votre site est prêt
- Vos produits sont correctement configurés
- Vous avez un système pour gérer les téléchargements/accès

---

## 💰 Accepter les paiements Crypto

### Option 1 : Stripe Crypto (Recommandé)

Stripe permet maintenant d'accepter des paiements en **USDC** (stablecoin) directement.

1. Dans votre Dashboard Stripe, allez dans **Paramètres** → **Paiements**
2. Cherchez **Crypto**
3. Activez les paiements en crypto

### Option 2 : Coinbase Commerce (Alternative)

Si vous voulez une expérience "Web3 native" :

1. Allez sur [Coinbase Commerce](https://commerce.coinbase.com)
2. Créez un compte
3. Créez une clé API
4. Nous pouvons intégrer Coinbase en parallèle de Stripe

**Recommandation** : Commencez avec Stripe Crypto, c'est plus simple. Vous pourrez ajouter Coinbase plus tard si vous le souhaitez.

---

## 📊 Gérer vos revenus

### Voir vos transactions

1. Allez dans **Paiements** → **Paiements**
2. Vous verrez toutes vos transactions (test et production)
3. Cliquez sur une transaction pour voir les détails

### Retirer vos revenus

1. Allez dans **Paramètres** → **Comptes bancaires**
2. Ajoutez votre compte bancaire français
3. Stripe transfère vos revenus automatiquement (généralement tous les 2-3 jours)

### Frais Stripe

Stripe prélève une commission sur chaque paiement :
- **Cartes bancaires** : 2,9% + 0,30€
- **Crypto** : Frais variables selon la blockchain

---

## ❓ Dépannage

### Les paiements ne fonctionnent pas

**Solution** :
1. Vérifiez que vos clés sont correctes dans les **Environment Variables** de Render
2. Assurez-vous que vous utilisez les clés de **test** (pk_test_, sk_test_)
3. Testez avec la carte `4242 4242 4242 4242`
4. Vérifiez les **Logs** de Render pour les erreurs

### Je ne vois pas mes transactions

**Solution** :
1. Assurez-vous que vous êtes en mode **test** (pas production)
2. Allez dans **Paiements** et cherchez votre transaction
3. Si vous ne la trouvez pas, vérifiez que le paiement a bien été traité

### Comment facturer mes clients ?

Stripe génère automatiquement des factures. Vous pouvez les personnaliser dans **Paramètres** → **Factures**.

---

## 🎉 C'est tout !

Vous avez maintenant un système de paiement complet et sécurisé pour **Volkano Lab**.

Pour toute question, consultez la [documentation Stripe](https://stripe.com/docs).
