# Exercice 4 : Résolution de Problème (4 points)

## 4.1 Identifiez les violations des principes SOLID dans ce code. (1 point)

**Violation du principe Open/Closed (O)**

- La classe est fermée à l'extension : pour ajouter un nouveau type de notification (WhatsApp, Telegram), il faut **modifier** le code existant (ajouter un `else if`)
- Elle devrait être ouverte à l'extension mais fermée à la modification

**Violation du principe de Responsabilité Unique (S)**

- La classe `NotificationService` gère **tous** les types de notifications (email, SMS, push, slack)
- Elle a trop de responsabilités : connexion SMTP, API SMS, Firebase, Slack, etc.
- Chaque changement dans un canal de notification force à modifier cette classe

**Violation du principe de Substitution de Liskov (L)**

- Impossible de substituer les comportements : tout est codé en dur avec des `if/else`
- Pas de polymorphisme

## 4.2 Quel pattern de conception permettrait de résoudre ces problèmes ? Justifiez. (1 point)

**Pattern Strategy**

**Justification** :

- Permet de définir une **famille d'algorithmes** (stratégies d'envoi : email, SMS, push, etc.)
- Encapsule chaque algorithme dans une classe séparée
- Rend les algorithmes **interchangeables** à l'exécution
- Respecte Open/Closed : ajouter un nouveau canal = créer une nouvelle classe Strategy sans modifier le code existant
- Respecte le principe de Responsabilité Unique : chaque stratégie gère son propre canal

## 4.3 Proposez une implémentation corrigée avec le pattern identifié. Incluez au moins 2 types de notifications. (2 points) [Voir le fichier](./tp.ts)

### Lancement du projet

- `npm install`
- `npm start`
