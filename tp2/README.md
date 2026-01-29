# Pattern Prototype - Système de Génération de Contrats d'Assurance

## Quel pattern de conception permettrait de créer efficacement de nouveaux contrats en évitant de recréer entièrement chaque contrat à partir de zéro ?

Le Pattern Prototype permet de créer de nouveaux contrats en clonant des instances existantes via un registre de prototypes. La méthode clone() copie les clauses et annexes, évitant leur réinitialisation à chaque création.

## Comment votre solution permettrait-elle de gérer efficacement :

### La création de multiples versions d'un même contrat

Le clonage profond rend chaque copie indépendante. On peut personnaliser chaque instance ou cloner un contrat déjà personnalisé sans affecter les autres.

### L'ajout d'un nouveau type de contrat

Il suffit de créer une classe héritant de Contrat, implémenter ses méthodes et l'enregistrer dans le registre. Aucune modification du code existant nécessaire.

### La modification des clauses standard

Deux niveaux de modification possibles : au niveau du prototype (impact sur tous les futurs clones) ou au niveau de l'instance (modification isolée grâce au clonage profond).
