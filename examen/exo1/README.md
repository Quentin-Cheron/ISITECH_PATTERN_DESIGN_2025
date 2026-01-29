# Exercice 1 : Conception (5 points)

## 1.1 Quel pattern de conception résout ce problème ? Justifiez. (1 point)

Le bon pattern est le Pattern Singleton, Il garantit une instance unique accessible globalement, assurant que tous les modules utilisent la même configuration.

## 1.2 Voir le fichier [uml.mermaid](./uml.mermaid)

[Visualiser le diagramme UML sur Mermaid Live](https://mermaid.live/edit#pako:eNqdlM1unDAQx18F-ZTVfoiPsGx8qNQmh1ZqqkhJLxUXB2ZZS3iMbNOmu9r36Xv0xWoIYlnqJWo5gec_P8_8B_tAMpkDoWS5XKZouCmBeg_MGFDoPXIsSjASvaV3K3HLi1oxw-33R6krbljJf_9SkGKbnJVM6zvOCsVEip592pVee044vEqaZ8lRG4aZ3dmpHShzZtgz02B1hnraKFuhI_wglQ1jLZ5BOcJfmICJ7K8a1BTcNvVDqtwhKRkWNStccMMF7CW6QoK92H4RsqZZ7ajb6crV7KSYF2A-dSZezd5ysVHfDYy0GeOa5nok2Q0Mn3nfJc_dvMZ5yxu3MOS1kmowoSleM6o36mslOBipi_e5m8wFVh9uJjjFeerGeIHTh81-inJ_NvELfo1E9i-ZMuwkfWy3HRV4THF4Ju0J54DmXuZ1CcOzOBcMrQ9dvCnttNWI8b6qJEcj3Byd7aBZHKimYB94WdpiHaBKyQy07gRuxnk7q9W7C5cO9WoN2js7La-Ev5v5H8p5F_9KIAtSKJ4TumWlhgURoARrvknrR0rMDgSkhNrXHLasLk1KUjzavIrhNykFoUbVNlPJutj1nLqyVxd0N3O_qgBzULeyRkNouNlELYXQA3khNIjWqzi-CYMkSMI4CaJwQX4Ser1eBWHoJ0m8TuIkub45Lsi-3ddfbaJNFCVr3w-jIEj8-PgHql0QPg)

## 1.3 Voir le fichier [tp.ts](./tp.ts)

### Lancement du projet

- `npm install`
- `npm start`

## 1.4 Quels sont les avantages et inconvénients de ce pattern ? Citez-en au moins 2 de chaque. (0.5 point)

### **Avantages :**

1. **Instance unique** : Garantit la cohérence des paramètres dans toute l'application
2. **Accès global** : Accessible facilement depuis tous les modules

### **Inconvénients :**

1. **Tests difficiles** : Complique les tests unitaires (difficile à mocker)
2. **Couplage fort** : Crée une dépendance globale dans tout le code
