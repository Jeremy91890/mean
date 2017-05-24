# TIC-MEAN

## Comprendre comment utiliser le boilerplate.

### Que contient votre boilerplate :


- Un server nodejs localhost:3000
- Un server mongo  localhost:27017


- Un volume pour permettre la persistance des donnees contenus dans votre base.
- Un sous reseaux prive qui va permettre au deux containers de communiquer.


ex : docker exec -ti node-server ping mongo => 200
Attention : Pour la connection de votre server node et mongo c'est bien "mongo" que vous devez utilise en adresse

### Node

Le serveur node est execute avec nodemon, il n'est pas necessaire de redemarer le server apres chaque modification
A titre d'info, vous ne devez pas utiliser nodemon pour la prod !

Dans le package Json, Node, Express et Mongoose. A vous d'ajouter ce que vous jugerez utile.


### Mongo

Pour le projet vous devrez importer des donnees sur votre serveur mongo, je vous encourage a regarder "mongoimport" et l'option --host
Un indice, votre systeme local connait communique avec votre serveur mongo sur 127.0.0.1:27017

Pour vous connectez directement sur le server mongo :

docker  exec -ti mongo /bin/bash


## Lancer le boilerplate :

docker-compose up

- Lance les deux server vous etes prets a travailler, la sortie standard s'affiche sur votre prompt

docker-conpose up -d

- Lance les deux server mais en mode detache, rien ne s'affiche sur la sortie standard.
  Vous avez la possibilite d'inspecter les logs avec la commande "docker logs container_name "


## Import database from crime*.csv :

- For enter in container mongo :

```bash
docker exec -it mongo bash
```

- For import database :

```bash
mongoimport -h 127.0.0.1:27017 -d mean -c crime_incident_reports --file crime_incident_reports.datadump-2.csv --type csv --headerline
```