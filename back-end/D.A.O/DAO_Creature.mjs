"use strict"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Creature {
	id
	userId
	areaId
    positionX
    positionY
	speed
	size
	shape
	reactivity
	health
	damage
	food

	constructor(objet) {
		// déclare et instancie les attributs en recopiant ceux de objet
		Object.assign(this, objet)
	}
}