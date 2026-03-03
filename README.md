# Volkano Lab - Site Web

Ce dépôt contient le code source du site web Volkano Lab, développé avec Astro, Tailwind CSS, et MDX.

## Stack Technique

*   **Framework**: [Astro](https://astro.build/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Contenu**: [MDX](https://mdxjs.com/)
*   **Déploiement**: Statique, compatible OVH mutualisé

## Installation

1.  **Cloner le dépôt** (ou décompresser l'archive) :

    ```bash
    git clone [URL_DU_REPO]
    cd volkano-lab
    ```

2.  **Installer les dépendances** avec `pnpm` (recommandé) :

    ```bash
    pnpm install
    ```

## Commandes utiles

*   **Démarrer le serveur de développement** :

    ```bash
    pnpm run dev
    ```

    Le site sera accessible à l'adresse `http://localhost:4321`.

*   **Compiler le site pour la production** :

    ```bash
    pnpm run build
    ```

    Les fichiers statiques seront générés dans le dossier `dist/`.

*   **Prévisualiser le build de production** :

    ```bash
    pnpm run preview
    ```

## Structure du projet

```
/src
  /components     # Composants Astro/React réutilisables
  /layouts        # Layouts de page (Base, Article, Outil)
  /pages          # Fichiers de pages et routes
  /content        # Collections de contenu (articles, outils) - à implémenter
  /styles         # Fichiers CSS globaux
  /config         # Fichier de configuration global (site.config.ts)
/public           # Fichiers statiques (images, fonts, robots.txt)
/dist             # Dossier de build (généré)
astro.config.mjs  # Configuration d'Astro
tailwind.config.js # Configuration de Tailwind CSS
```

## Déploiement sur OVH Mutualisé

1.  **Compiler le projet** avec `pnpm run build`.
2.  **Transférer le contenu** du dossier `dist/` à la racine de votre hébergement web (généralement le dossier `www/`) via un client FTP (FileZilla, Cyberduck, etc.).

Le site étant 100% statique, aucune configuration serveur supplémentaire n'est nécessaire.

## Personnalisation

La plupart des configurations globales (nom du site, couleurs, navigation, etc.) peuvent être modifiées dans le fichier `/src/config/site.config.ts`.
