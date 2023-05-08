# evolv.io
A .io style game
#a

back-end/D.A.O/ -> npm i
back-end/ -> npm install @hapi/hapi
back-end/ -> npm install nodemon -g
back-end/ -> npm install @hapi/inert
back-end/ -> npm install @hapi/vision
back-end/ -> npm install handlebars

Actualiser le schéma de base de données : back-end/D.A.O/ -> ./node_modules/.bin/prisma db push
Lire la base de données : back-end/D.A.O/ -> ./node_modules/.bin/prisma studio
Lancer le serveur local : back-end/ -> nodemon server.js