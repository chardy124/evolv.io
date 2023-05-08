"use strict";
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const path = require("path");
const fs = require("fs");

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 3000,
        // Chemin pris par défaut pour les pages statiques (h.file)
        routes: {
            files: {
                relativeTo: path.join(__dirname, "views")
            }
        }
    });

    await server.register([
        {
            plugin: require("hapi-geo-locate"),
            options: {
                enabledByDefault: true
            }
        }, {
            plugin: Inert
        },
        {
            plugin: Vision
        }
    ]);

    server.views({
        engines: {
            html: require("handlebars")
        },
        // Chemin pris par défaut pour les pages dynamiques (h.view)
        path: path.join(__dirname, "views"),
    })

    server.route([

        // Page d'accueil
        {
            method: "GET",
            path: "/",
            handler: (request, h) => {
                return h.file("./static_pages/welcome.html");
            }
        },

        // Liste des enregistrements des tables
        {
            method: "GET",
            path: "/users",
            handler: (request, h) => {
                return "<h1>Liste des utilisateurs</h1>"
            }
        }, {
            method: "GET",
            path: "/areas",
            handler: (request, h) => {
                return "<h1>Liste des zones</h1>"
            }
        }, {
            method: "GET",
            path: "/creatures",
            handler: (request, h) => {
                return "<h1>Liste des créatures</h1>"
            }
        },

        // Affichage de l'enregistrement ciblé par l'identifiant fourni
        {
            method: "GET",
            path: "/users/{id}",
            handler: (request, h) => {
                return "<h1>Identifiant de l'utilisateur : " + request.params.id + "</h1>"
            }
        }, {
            method: "GET",
            path: "/areas/{id}",
            handler: (request, h) => {
                return "<h1>Identifiant de la zone: " + request.params.id + "</h1>"
            }
        }, {
            method: "GET",
            path: "/creatures/{id}",
            handler: (request, h) => {
                return "<h1>Identifiant de la créature : " + request.params.id + "</h1>"
            }
        },

        // Route inconnue
        {
            method: "GET",
            path: "/{any*}",
            handler: (request, h) => {
                return "<h1>Page inconnue</h1>"
            }
        },

        // Localisation du client
        {
            method: "GET",
            path: "/location",
            handler: (request, h) => {
                return request.location;
            }
        },

        // Authentification
        {
            method: "POST",
            path: "/login",
            handler: (request, h) => {
                if (request.payload.nickname === "admin" && request.payload.password === "admin") {
                    return "<h1>Vous êtes administrateur</h1>";
                } else {
                    const data = {
                        nickname: request.payload.nickname
                    }
                    return h.view("./dynamic_pages/loggedIn.html", data);
                }
            }
        },

        // Connecté
        {
            method: "GET",
            path: "/dynamic",
            handler: (request, h) => {
                const data = {
                    nickname: "PseudoDonné"
                }
                return h.view("./dynamic_pages/loggedIn.html", data);
            }
        }

    ]);

    await server.start();
    console.log("Server running at:" + server.info.uri);

}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
})

init();