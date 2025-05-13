# Étape 1 : Build du frontend React
FROM node:18 AS build-frontend

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers nécessaires pour le build frontend
COPY package.json package-lock.json ./
COPY public/ public/
COPY src/ src/

# Installer les dépendances
RUN npm install

# Lancer le build de l'application React
RUN npm run build

# Étape 2 : Serveur Express avec le frontend intégré
FROM node:18

# Définir le répertoire de travail du backend
WORKDIR /usr/src/app/server

# Copier les fichiers backend
COPY server/ ./

# Copier manuellement le build React dans server/build
COPY --from=build-frontend /usr/src/app/build ./build

# Installer les dépendances backend
RUN npm install

# Exposer le port utilisé par Express (8181)
EXPOSE 8181

# Démarrer le serveur Express
CMD ["node", "index.js"]
