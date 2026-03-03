# 🚀 Déploiement Rapide sur Render (5 étapes)

Suivez ce guide pour mettre votre site **Volkano Lab** en ligne sur **Render** en moins de 15 minutes.

---

## ✅ Étape 1 : Préparer votre code sur GitHub

### 1.1 Créer un compte GitHub
- Allez sur [github.com](https://github.com)
- Cliquez sur "Sign up"
- Remplissez vos informations

### 1.2 Créer un nouveau repository
- Cliquez sur le "+" en haut à droite → "New repository"
- **Repository name** : `volkano-lab`
- **Visibility** : Public
- Cliquez sur "Create repository"

### 1.3 Pousser votre code
Ouvrez un terminal et exécutez :

```bash
# Clonez le repository
git clone https://github.com/VOTRE_USERNAME/volkano-lab.git
cd volkano-lab

# Copiez tous les fichiers du projet Volkano Lab ici
# (Remplacez les fichiers existants)

# Poussez le code
git add .
git commit -m "Initial commit: Volkano Lab"
git push origin main
```

---

## ✅ Étape 2 : Créer un compte Render

1. Allez sur [render.com](https://render.com)
2. Cliquez sur "Get Started"
3. Connectez-vous avec GitHub
4. Autorisez Render à accéder à vos repositories

---

## ✅ Étape 3 : Créer un service Web sur Render

1. Cliquez sur **New +** → **Web Service**
2. Sélectionnez votre repository `volkano-lab`
3. Remplissez les informations :
   - **Name** : `volkano-lab`
   - **Environment** : `Node`
   - **Build Command** : `pnpm install && pnpm run build`
   - **Start Command** : `pnpm run preview`
   - **Plan** : Free (gratuit)

4. Cliquez sur **Create Web Service**

Render va maintenant compiler et déployer votre site. ⏳ Attendez 5-10 minutes.

---

## ✅ Étape 4 : Configurer les variables d'environnement

1. Dans votre service Render, allez dans **Environment**
2. Cliquez sur **Add Environment Variable**
3. Ajoutez ces variables :

| Clé | Valeur |
|-----|--------|
| `NODE_ENV` | `production` |
| `PUBLIC_STRIPE_PUBLISHABLE_KEY` | Votre clé Stripe publique (pk_test_...) |
| `STRIPE_SECRET_KEY` | Votre clé Stripe secrète (sk_test_...) |
| `SITE` | `https://volkano-lab.onrender.com` |

4. Cliquez sur **Save**

Render va redéployer automatiquement avec les nouvelles variables.

---

## ✅ Étape 5 : Accéder à votre site

Votre site est maintenant en ligne à :

```
https://volkano-lab.onrender.com
```

### Accéder au dashboard admin :

```
https://volkano-lab.onrender.com/admin
```

Connectez-vous avec votre compte GitHub.

---

## 🎉 C'est fait !

Votre site est maintenant **en ligne et permanent** sur Render. 

### Prochaines étapes :

1. **Ajouter votre domaine OVH** (voir `GUIDE_DEPLOYMENT.md` section "Connexion du Domaine OVH")
2. **Configurer Stripe** (voir `GUIDE_DEPLOYMENT.md` section "Configuration des Paiements Stripe")
3. **Ajouter du contenu** via le dashboard admin

---

## 📝 Mises à jour futures

Chaque fois que vous modifiez votre code sur GitHub, Render détecte automatiquement les changements et redéploie votre site.

Pour modifier le contenu sans toucher au code, utilisez simplement le dashboard admin ! 🎛️

---

## ❓ Besoin d'aide ?

Consultez le `GUIDE_DEPLOYMENT.md` complet pour plus de détails sur chaque étape.
