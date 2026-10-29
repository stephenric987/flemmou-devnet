# Flemmou (FLMO) — prototype Solana Devnet

Projet expérimental de memecoin sur le réseau de test Solana Devnet.
Les jetons de ce projet sont destinés aux essais techniques.

## Configuration

- Nom : Flemmou
- Symbole : FLMO
- Quantité initiale : 1 000 000 000 jetons
- Décimales : 6
- Programme : SPL Token-2022
- Nom et symbole enregistrés dans les métadonnées du token
- Autorité de gel absente
- Autorité de création de jetons supplémentaires supprimée dans la transaction de création
- Logo et présentation publiés ; URI des métadonnées enregistrée sur Devnet

## État du projet

Le token a été créé sur Solana Devnet. Sa transaction de création est finalisée, sans erreur. La vérification sur la blockchain confirme le nom Flemmou, le symbole FLMO, 6 décimales, une quantité de 1 000 000 000 jetons et des autorités d'émission et de gel absentes.

- Adresse du token : `26FgjbVUdaynajUGiJ3jBFty1fnyf81oTrWKcSLGhHFn`
- [Voir le token sur l'explorateur Solana Devnet](https://explorer.solana.com/address/26FgjbVUdaynajUGiJ3jBFty1fnyf81oTrWKcSLGhHFn?cluster=devnet)
- [Transaction de création finalisée](https://explorer.solana.com/tx/4QwLt65fWuiA2vHNrRYadYhLFZ3JrbyttyAECgGhS996USQJXcf6pJQs8HDaPoyzVFWMxzhYXE1XzyPsekr6eg3e?cluster=devnet)

Le compte créateur a reçu l'intégralité de l'émission initiale. Les autorités de mise à jour des métadonnées et du pointeur de métadonnées restent détenues par le portefeuille créateur.

## Identité et métadonnées

![Logo Flemmou](assets/flemmou-logo-v1.png)

Flemmou a plein de projets. Il commence demain. Ce gecko expert en procrastination est la mascotte de FLMO, un memecoin de test sur Solana Devnet. Son programme : des mèmes, de l’autodérision et une communauté qui avance à son rythme. Ici, on prend le temps d’apprendre, de créer et de sourire. Toujours motivé. Dès demain.

- [Métadonnées JSON](https://raw.githubusercontent.com/stephenric987/flemmou-devnet/22156f8e26d12576705bae4994e671f30c5f06bf/metadata/flemmou-v1.json)
- [Logo PNG](https://raw.githubusercontent.com/stephenric987/flemmou-devnet/8e59b4c7ff9eaff989837de5e32863191c5e54ba/assets/flemmou-logo-v1.png)
- [Mise à jour finalisée](https://explorer.solana.com/tx/5z5KorYVijkVdK8BPBmbyhhM32R8QVTzUvpLv8dgzxnthxcNW8KzkfwUtAUDqu1RpqbXJHQWHbnJw7SawSQ4CRhF?cluster=devnet)

Les liens utilisent des versions précises du dépôt. Leur disponibilité dépend de l’hébergement GitHub. L’affichage dans un portefeuille dépend de sa prise en charge des métadonnées Token-2022.

## Utilisation avec Solana Playground

1. Ouvrir https://beta.solpg.io/ et créer un projet client TypeScript.
2. Copier `client.ts` dans le fichier client du projet.
3. Connecter un portefeuille de test Playground et choisir Devnet avec l'adresse RPC `https://api.devnet.solana.com`.
4. Alimenter ce portefeuille avec au moins 0,01 SOL de test.
5. Exécuter le client avec **Run**.

Le script prépare en une transaction la création du token, ses métadonnées, le compte de réception, l'émission initiale et la suppression de l'autorité d'émission. Il affiche ensuite les résultats et un lien vers l'explorateur Devnet.

Une nouvelle exécution avec le même portefeuille réutilise l'adresse dérivée et vérifie le token existant sans créer une nouvelle émission. Le script refuse les autres adresses RPC.

## Fichiers

- `client.ts` : client de création et de vérification.
- `token.config.json` : description publique du prototype. Les constantes exécutées sont dans `client.ts`.
- `.gitignore` : exclusions pour clés, fichiers d'environnement et fichiers locaux.

## Portefeuille

Aucune clé privée, phrase de récupération ou export de portefeuille n'est inclus. Le client utilise le portefeuille de test connecté localement dans Playground. Conserver les exports de portefeuille en dehors du dépôt.
