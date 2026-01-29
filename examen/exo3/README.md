# Exercice 3 : Correction de Pattern (4 points)

## 3.1 Identifiez au moins 3 erreurs ou problèmes dans cette implémentation. (1.5 points)

**Erreur 1 : Les décorateurs n'ont pas de référence au composant décoré**

- Les décorateurs devraient contenir un attribut `coffee: Coffee` pour encapsuler l'objet à décorer
- Sans cela, impossible de déléguer les appels et de composer les décorateurs

**Erreur 2 : Pas de constructeur pour injecter le composant**

- Les décorateurs ne prennent pas de `Coffee` en paramètre de constructeur
- Impossible de chaîner les décorateurs : `new MilkDecorator(new SugarDecorator(new Coffee()))`

**Erreur 3 : Impossible de combiner plusieurs décorations**

- On ne peut créer qu'un seul décorateur à la fois
- Pas de composition possible : on ne peut pas avoir café + lait + sucre + caramel

## 3.2 Visualiser le fichier [tp.ts](./tp.ts)

### Lancement du projet

- `npm install`
- `npm start`
