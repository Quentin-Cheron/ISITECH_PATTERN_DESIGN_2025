1. Identifiez les problèmes dans le code existant, notamment en termes de :

   **Duplication de code :**
   - 9 méthodes identiques répétées dans 3 classes (envoyerParEmail, envoyerParSMS, envoyerParPush)
   - Modification d'un canal = modifier 3 endroits

   **Extensibilité :**
   - Ajouter un canal (WhatsApp) = modifier 3 classes existantes
   - Ajouter un type (NotificationPromotion) = dupliquer tout le code d'envoi
   - Impossible de changer le canal dynamiquement

   **Maintenance :**
   - Aucune documentation JSDoc
   - Modification d'un canal nécessite de toucher 3 classes
   - Tests multipliés par 3

   **Couplage entre les composants :**
   - Type de notification couplé au canal d'envoi
   - Violation du Single Responsibility Principle (une classe gère contexte ET envoi)
   - Code client dépend des classes concrètes

2. Quel pattern de conception permettrait de :
   - Séparer les types de notifications de leurs implémentations
   - Permettre l'évolution indépendante des deux aspects
   - Éviter l'explosion combinatoire des classes

   **Réponse : Le Pattern Bridge**

   Le pattern Bridge sépare une abstraction de son implémentation afin que les deux puissent évoluer indépendamment.

   **Dans notre cas :**
   - **Abstraction** : Les types de notifications (Commande, Livraison, Support)
   - **Implémentation** : Les canaux d'envoi (Email, SMS, Push)

   **Avantages :**
   - Ajouter un nouveau type de notification ne nécessite qu'une seule nouvelle classe
   - Ajouter un nouveau canal ne nécessite qu'une seule nouvelle classe d'implémentation
   - Moins de classes : 3 types × 3 canaux = 6 classes au lieu de 9
   - Changement de canal à l'exécution possible
   - Respect du principe Open/Closed

3. Comment votre solution faciliterait-elle :

   **L'ajout d'un nouveau type de notification (par exemple "Promotion") :**
   - Créer 1 seule classe `NotificationPromotion`
   - Fonctionne immédiatement avec tous les canaux existants
   - Aucune modification du code existant

   **L'ajout d'une nouvelle plateforme d'envoi (par exemple "Discord") :**
   - Créer 1 seule classe `DiscordSender`
   - Fonctionne immédiatement avec tous les types de notifications
   - Aucune modification des classes existantes

   **La modification du comportement d'envoi pour une plateforme spécifique :**
   - Modifier uniquement la classe du canal concerné (ex: `EmailSender`)
   - Toutes les notifications utilisant ce canal bénéficient automatiquement de la modification
   - Les autres canaux ne sont pas affectés
