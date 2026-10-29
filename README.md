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
- Aucun logo ni fichier de métadonnées externe hébergé pour le moment

## État du projet

Le script a été exécuté dans Solana Playground jusqu'à la construction de la transaction (621 octets) et au contrôle du solde. Il s'est arrêté faute de SOL de test. À ce stade, aucun token n'a été créé et la transaction complète n'a pas encore été validée sur Devnet.

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
