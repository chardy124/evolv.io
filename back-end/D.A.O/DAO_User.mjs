"use strict"
import { PrismaClient } from "@prisma/client";
import Hapi from "@hapi/hapi";
const prisma = new PrismaClient();

class User {
	id
	nickname
	password
	areaId

	constructor(objet) {
		// déclare et instancie les attributs en recopiant ceux de objet
		Object.assign(this, objet)
	}
}

class Users {
	users = []
}

const model = new Users();

const userDao = {
	// Retourne toutes les utilisateurs
	findAll: () => model.users,

	// Retourne un utilisateur par son id
	findById: (id) => {
		const users = model.users.filter(user => user.id == id)
		return users.length > 0? users[0] : null
	},

	// Authentifie un utilisateur par le nom ET le mot de passe saisi

	ComparMDP: (nickname, pssw) => {

		if (model.users.filter(user=> user.nickname!=nickname)){
			return null
		}
		else if (model.users.filter(user=> user.password!=pssw)){
			return null
		}
		return "correct" 

	},


	// Supprime un utilisateur
	deleteById: (id) => {
		const user = userDao.findById(id)
		if (user == null){
			return null
		}
		model.users = model.users.filter(user => user.id != id)
		return user
	},

	// Ajoute un utilisateur
	add: (user) => {
		const userById = userDao.findById(user.id)
		if (userById != null){
			return null
		}
		model.users.push(user)
		return user
	},

	// Modifie un utilisateur
	update: (id, user) => {
		const userById = userDao.findById(id)
		if (userById == null){
            return null
        }
		userDao.deleteById(id)
		userDao.deleteById(user.id)
		userDao.add(user)
		return user
	}
}

const server = Hapi.server({
    host: "localhost",
    port: 3000
});

server.route({})