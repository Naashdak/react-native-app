# KNOW-EDGE MOBILE

## Membres

- 🐈 [**@LoickBrouard**]
- 🦞 [**@PierreVilly**]
- 🦖 [**@Rakbaal**]
- 🕊️ [**@La_Mouettas**]

## Description du projet

Application mobile du projet Know-Edge.

## Installation
Pour installer le projet, il faut d'abord cloner le projet sur votre machine. Ensuite il faut installer les dépendances avec la commande suivante : 
```bash
npm install
```

Il faut ensuite créer un fichier .env, ajouter les variables d'environnement et leurs valeurs associées : 

  - OPENWEATHERMAP_APIKEY={API_KEY}
  - STRAPI_BEARER_TOKEN={BEARER_TOKEN}

Pour lancer le projet : 
```bash
npx expo start
```

Vous pouvez scanner le QRCode avec l'application ExpoGo préalablement télécharger sur votre téléphone

## Architecture

    Le projet est organisé par fonctionnalités et chacune peut comporter différents dossiers

    feature: 
    |___ domain: logique métier
    |    |___ model: Type/Interface liés à la fonctionnalité
    |    |___ use-case: Cas d'usage de la fonctionnalité permettant de tester la fonction
    |
    |___ presentation: Interface utilisateur, composants et state
         |___ components: Composants React-Native de la fonctionnalité
         |___ FeatureScreen.tsx: Ecran de la fonctionnalité


    Cas spécifique du dossier core qui gère les besoins en commun de l'application et les éléments qui peuvent être réutilisés par plusieurs fonctionnalités

    core:
    |___ data: Données
    |    |___ api: Services HTTP
    |    |___ local: Base de données interne
    |
    |___ domain: logique métier commune
    |    |___ model: Entités et types
    |    |___ services: Services métiers
    |
    |___ di: Injection de dépendance
    |    |___ inversify.config.ts: Enregistrer les services et rendre leurs instances disponibles
    |    |___ invensify.identifiers.ts: Gestion des noms permettant d'identifier les services
    |
    |___ navigation: Gestion de la navigation
    |    |___ RootNavigator.tsx: Gère la navigation de l'application
    |    |___ StackNavigator.tsx: Configuration des pages
    |    |___ StackNavigatorParamList.ts: Configuration des paramètres des pages
    |    |___ invensify.identifiers.ts: Gestion des noms permettant d'identifier les services
    |
    |___ utils: Fonctions utilitaires