"use strict"
import { PrismaClient } from "@prisma/client";
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

class Area {
	id
	name
	temperature
	humidity
	fullness
	reactivity
	speed

	constructor(objet) {
		// déclare et instancie les attributs en recopiant ceux de objet
		Object.assign(this, objet)
	}
}

class Creature {
	id
	userId
	areaId
	size
	shape
	reactivity
	speed
	health
	damage
	food

	constructor(objet) {
		// déclare et instancie les attributs en recopiant ceux de objet
		Object.assign(this, objet)
	}
}

let user1 = await prisma.user.findUnique({
	where: {
		login: "user1"
	}
})
if (user1 != null){
	const deleteUser = await prisma.user.delete({
		where: {
			nickname: "user1"
		}
	})
	console.log("${deleteUser} a été supprimé")
}

console.log(user1)
// création d'un nouveau utilisateur
user1 = new User({
	id: "123-ydfu-852",
	nickname: "user1",
	password: "pass1",
	areaId: 13
})
// sauvegarde de user1
const createUser = await prisma.user.create({data: user1})
console.log(user1, createUser)