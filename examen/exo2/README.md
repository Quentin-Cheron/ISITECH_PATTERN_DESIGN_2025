# Exercice 2 : Identification de Pattern (4 points)

## 2.1 Identifiez le pattern utilisé. (0.5 point)

**Factory Method**

## 2.2 Listez les participants du pattern et associez-les aux classes du code. (1.5 points)

**Product (interface)** : `IVehicle` - Définit l'interface des objets créés

**ConcreteProduct** : `Car`, `Motorcycle`, `Truck` - Implémentations concrètes du produit

**Creator (abstrait)** : `VehicleFactory` - Déclare la factory method `CreateVehicle()`

**ConcreteCreator** : `CarFactory`, `MotorcycleFactory`, `TruckFactory` - Implémentent `CreateVehicle()` pour retourner un produit spécifique

## 2.3 Expliquez le rôle de la méthode OrderVehicle() dans ce pattern. Comment s'appelle ce type de méthode ? (1 point)

La méthode `OrderVehicle()` est une **Template Method**.

**Rôle** : Elle définit le squelette de l'algorithme de commande (enregistrement → assemblage → livraison) en appelant la factory method `CreateVehicle()`. Les sous-classes définissent quel véhicule créer, mais le processus de commande reste identique

## 2.4 Quelle différence fondamentale y a-t-il entre ce pattern et Abstract Factory ? Dans quel cas préféreriez-vous l'un à l'autre ? (1 point)

**Différence fondamentale** :

- **Factory Method** : Crée **UN type** de produit
- **Abstract Factory** : Crée une **famille** de produits liés

**Quand utiliser** :

- **Factory Method** : Quand vous avez un seul produit avec plusieurs variantes
- **Abstract Factory** : Quand vous avez plusieurs produits qui doivent être cohérents entre eux
