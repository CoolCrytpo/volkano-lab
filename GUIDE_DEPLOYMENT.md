# 🚀 Guide Complet : Volkano Lab - Maître à Bord

Bienvenue dans votre guide d'autonomie pour gérer et déployer **Volkano Lab** sur Render. Ce document vous permettra de maîtriser chaque aspect du site, du contenu à la mise en ligne.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Accès au Dashboard Admin](#accès-au-dashboard-admin)
3. [Gestion du Contenu (No-Code)](#gestion-du-contenu-no-code)
4. [Configuration des Paiements Stripe](#configuration-des-paiements-stripe)
5. [Déploiement sur Render](#déploiement-sur-render)
6. [Connexion du Domaine OVH](#connexion-du-domaine-ovh)
7. [Maintenance et Mises à Jour](#maintenance-et-mises-à-jour)
8. [Dépannage](#dépannage)

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Un compte **GitHub** (gratuit sur [github.com](https://github.com))
- ✅ Un compte **Render** (gratuit sur [render.com](https://render.com))
- ✅ Un compte **Stripe** (gratuit sur [stripe.com](https://stripe.com))
- ✅ Votre domaine **OVH** (ou registraire de votre choix)

---

## 🎛️ Accès au Dashboard Admin

### Étape 1 : Accéder à votre interface d'administration

Une fois le site déployé sur Render, vous pouvez accéder à votre dashboard admin à cette adresse :

```
https://votre-site.onrender.com/admin
```

**Exemple :** `https://volkano-lab.onrender.com/admin`

### Étape 2 : Authentification

À la première visite, vous serez invité à vous connecter via **GitHub**. Cela sécurise votre accès et empêche les visiteurs d'accéder à l'admin.

- Cliquez sur "Sign in with GitHub"
- Autorisez l'accès
- Vous êtes maintenant dans votre dashboard !

---

## 📝 Gestion du Contenu (No-Code)

Le dashboard Keystatic vous permet de gérer tout le contenu sans toucher au code.

### Ajouter un nouvel article

1. **Allez dans** → "Articles" dans le menu de gauche
2. **Cliquez sur** → "Créer un nouvel article"
3. **Remplissez les champs** :
   - **Titre** : Le titre de votre article
   - **Description** : Un résumé court (20-160 caractères)
   - **Date** : La date de publication
   - **Auteur** : Par défaut "Volkano Lab"
   - **Image** : Téléchargez une image de couverture
   - **Tags** : Ajoutez des catégories (ex: "IA", "Crypto")
   - **TL;DR** : Les points clés à retenir
   - **Impact concret** : Explications pratiques
   - **Risques & Conformité** : Informations importantes (optionnel)
   - **Checklist action** : Les actions à faire
   - **Contenu** : Le texte complet de l'article

4. **Cliquez sur** → "Publier"

L'article apparaîtra immédiatement sur votre site !

### Ajouter un nouvel outil

1. **Allez dans** → "Outils" dans le menu de gauche
2. **Cliquez sur** → "Créer un nouvel outil"
3. **Remplissez les champs** :
   - **Titre** : Le nom de l'outil
   - **Description** : Une description courte
   - **Image** : Image de couverture
   - **Tags** : Catégories
   - **Premium** : Cochez si c'est un contenu payant
   - **Prix en EUR** : Montant en euros (ex: 29.99)
   - **Prix en USDC** : Montant en stablecoins (ex: 29.99)
   - **ID Produit Stripe** : Sera rempli automatiquement
   - **Lien de téléchargement** : URL vers le fichier ou page d'accès
   - **Contenu** : Description détaillée

4. **Cliquez sur** → "Publier"

### Modifier une page existante

1. **Allez dans** → "Pages" dans le menu de gauche
2. **Sélectionnez** la page à modifier (ex: "À propos")
3. **Modifiez** les champs
4. **Cliquez sur** → "Publier"

### Gérer les paramètres du site

1. **Allez dans** → "Paramètres du site"
2. **Modifiez** :
   - Nom du site
   - Slogan
   - Email de contact
   - Clés Stripe (voir section suivante)

---

## 💳 Configuration des Paiements Stripe

### Étape 1 : Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Cliquez sur "Commencer"
3. Remplissez vos informations (entreprise, adresse, etc.)
4. Validez votre identité

### Étape 2 : Récupérer vos clés API

1. Connectez-vous à votre **Dashboard Stripe**
2. Allez dans **Paramètres** → **Clés API**
3. Vous verrez deux clés :
   - **Clé publique** (commence par `pk_test_` ou `pk_live_`)
   - **Clé secrète** (commence par `sk_test_` ou `sk_live_`)

### Étape 3 : Ajouter vos clés à Render

1. Allez sur [render.com](https://render.com)
2. Sélectionnez votre service "volkano-lab"
3. Allez dans **Environment** → **Environment Variables**
4. Ajoutez deux variables :
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY` = votre clé publique
   - `STRIPE_SECRET_KEY` = votre clé secrète

5. Cliquez sur **Deploy** pour appliquer les changements

### Étape 4 : Créer des produits dans Stripe

1. Dans votre **Dashboard Stripe**, allez dans **Produits**
2. Cliquez sur **Créer un produit**
3. Remplissez les informations :
   - **Nom** : Le nom de votre outil/article
   - **Prix** : Le montant en EUR
   - **Devise** : EUR (euros)
4. Cliquez sur **Créer un produit**
5. Copiez l'**ID du produit** (commence par `prod_`)
6. Collez cet ID dans votre dashboard admin Keystatic

### Étape 5 : Tester les paiements

1. Utilisez les numéros de carte de test Stripe :
   - **Carte valide** : `4242 4242 4242 4242`
   - **Carte refusée** : `4000 0000 0000 0002`
   - **Expiration** : N'importe quelle date future
   - **CVC** : N'importe quel code à 3 chiffres

2. Testez un achat sur votre site
3. Vérifiez que la transaction apparaît dans votre Dashboard Stripe

---

## 🚀 Déploiement sur Render

### Étape 1 : Préparer votre code sur GitHub

1. **Créez un compte GitHub** (si ce n'est pas déjà fait)
2. **Créez un nouveau repository** :
   - Nom : `volkano-lab`
   - Visibilité : Public
3. **Clonez le repository** sur votre ordinateur :
   ```bash
   git clone https://github.com/VOTRE_USERNAME/volkano-lab.git
   cd volkano-lab
   ```
4. **Copiez tous les fichiers du projet** dans ce dossier
5. **Poussez le code** sur GitHub :
   ```bash
   git add .
   git commit -m "Initial commit: Volkano Lab setup"
   git push origin main
   ```

### Étape 2 : Créer un service sur Render

1. Allez sur [render.com](https://render.com)
2. Cliquez sur **New +** → **Web Service**
3. Sélectionnez votre repository GitHub `volkano-lab`
4. Remplissez les informations :
   - **Name** : `volkano-lab`
   - **Environment** : `Node`
   - **Build Command** : `pnpm install && pnpm run build`
   - **Start Command** : `pnpm run preview`
   - **Plan** : Free (gratuit)

5. Cliquez sur **Create Web Service**

### Étape 3 : Configurer les variables d'environnement

1. Dans votre service Render, allez dans **Environment**
2. Ajoutez les variables suivantes :
   - `NODE_ENV` = `production`
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY` = votre clé Stripe publique
   - `STRIPE_SECRET_KEY` = votre clé Stripe secrète
   - `SITE` = `https://volkano-lab.onrender.com`

3. Cliquez sur **Save**

### Étape 4 : Déploiement automatique

Render va maintenant :
1. Télécharger votre code depuis GitHub
2. Installer les dépendances
3. Compiler le site
4. Le mettre en ligne

Vous pouvez suivre la progression dans l'onglet **Logs**.

Une fois terminé, votre site sera accessible à :
```
https://volkano-lab.onrender.com
```

---

## 🌐 Connexion du Domaine OVH

### Étape 1 : Configurer votre domaine sur Render

1. Dans votre service Render, allez dans **Settings**
2. Cherchez la section **Custom Domain**
3. Entrez votre domaine : `volkanolab.com`
4. Cliquez sur **Add Custom Domain**

Render vous donnera un **CNAME** à configurer chez OVH.

### Étape 2 : Configurer le DNS chez OVH

1. Connectez-vous à votre compte **OVH**
2. Allez dans **Domaines** → **volkanolab.com**
3. Cliquez sur **Zone DNS**
4. Cherchez l'enregistrement `www` ou créez-en un
5. Remplacez la cible par le **CNAME fourni par Render**
6. Cliquez sur **Valider**

**Attention** : Les changements DNS peuvent prendre 24-48 heures pour se propager.

### Étape 3 : Vérifier la connexion

Une fois propagé, votre site sera accessible à :
```
https://volkanolab.com
```

---

## 🔄 Maintenance et Mises à Jour

### Mettre à jour le contenu

1. **Accédez à votre dashboard** : `https://volkanolab.com/admin`
2. **Modifiez le contenu** via l'interface Keystatic
3. **Cliquez sur Publier**
4. **Render détecte automatiquement** les changements et met à jour le site en quelques secondes

### Mettre à jour le code

Si vous devez modifier le code (ajouter une fonctionnalité, corriger un bug) :

1. **Modifiez les fichiers** sur votre ordinateur
2. **Poussez vers GitHub** :
   ```bash
   git add .
   git commit -m "Description de vos changements"
   git push origin main
   ```
3. **Render détecte automatiquement** le push et redéploie le site

### Sauvegarder vos données

Vos articles et outils sont stockés dans GitHub. Pour une sauvegarde supplémentaire :

1. **Téléchargez votre repository** régulièrement
2. **Exportez vos données Stripe** depuis votre Dashboard

---

## 🆘 Dépannage

### Le site ne se charge pas

**Solution** :
1. Vérifiez que le déploiement est terminé dans les **Logs** de Render
2. Attendez 5 minutes (les changements DNS peuvent être lents)
3. Videz le cache de votre navigateur (Ctrl+Shift+Delete)

### Les paiements ne fonctionnent pas

**Solution** :
1. Vérifiez que vos clés Stripe sont correctes dans les **Environment Variables**
2. Assurez-vous que vous utilisez les clés de **test** (commençant par `pk_test_` et `sk_test_`)
3. Testez avec la carte `4242 4242 4242 4242`

### Le dashboard admin ne s'affiche pas

**Solution** :
1. Vérifiez que vous êtes connecté via GitHub
2. Assurez-vous que votre compte GitHub a accès au repository
3. Essayez d'accéder à `https://volkanolab.com/admin` (et non `/admin/`)

### Les modifications n'apparaissent pas

**Solution** :
1. Vérifiez que vous avez cliqué sur **Publier** dans Keystatic
2. Attendez quelques secondes que Render redéploie
3. Videz le cache de votre navigateur

---

## 📞 Support et Ressources

- **Documentation Render** : https://render.com/docs
- **Documentation Stripe** : https://stripe.com/docs
- **Documentation Keystatic** : https://keystatic.com/docs
- **Documentation Astro** : https://docs.astro.build

---

## ✅ Checklist de Lancement

Avant de lancer votre site en production :

- [ ] Domaine OVH configuré et pointant vers Render
- [ ] Clés Stripe en mode **production** (pas test)
- [ ] Au moins 3 articles publiés
- [ ] Au moins 2 outils disponibles
- [ ] Page "À propos" complétée
- [ ] Mentions légales et Politique de confidentialité remplies
- [ ] Email de contact configuré
- [ ] Test d'un paiement réel avec Stripe
- [ ] Vérification que les emails de confirmation Stripe sont reçus

---

**Félicitations ! Vous êtes maintenant maître à bord de Volkano Lab.** 🎉

Pour toute question, consultez les ressources ci-dessus ou contactez le support Render.
