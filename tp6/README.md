### 1. Quels patterns de conception permettraient de :

#### a) Fournir une interface simplifiée pour le système de commande complexe ?

Le pattern Facade est la solution idéale. Il encapsule la complexité des sous-systèmes. Le client utilise une interface unique. La facade orchestre tous les appels internes. Le code client devient beaucoup plus simple.

#### b) Contrôler l'accès et retarder l'initialisation des services coûteux ?

Le pattern Proxy avec Lazy Initialization répond à ce besoin. Les services coûteux sont créés à la première utilisation. Cela économise des ressources au démarrage. Les performances sont améliorées. La facade contrôle l'accès aux services.

### 2. Comment votre solution permettrait-elle d'ajouter facilement :

#### a) Un nouveau sous-système (par exemple "ReturnService" pour les retours)

On crée d'abord la classe ReturnService. On l'ajoute comme instance privée dans la facade. On expose des méthodes publiques simples. Le code client existant n'est pas impacté. Les nouvelles fonctionnalités sont accessibles facilement.

#### b) Un nouveau type de proxy (par exemple un proxy de cache pour NotificationService)

On crée un proxy qui implémente la même interface. Le proxy intercepte les appels au service réel. Il vérifie si la notification a déjà été envoyée. Si oui, il ignore la demande. Sinon, il délègue au service réel. Dans la facade, on remplace l'instanciation directe par le proxy. Cette substitution est transparente. On peut activer ou désactiver le cache facilement.
