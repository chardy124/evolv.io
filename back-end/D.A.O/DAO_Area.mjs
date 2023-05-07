"use strict"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Area {
	id
	name
	temperature
	humidity
	fullness
	reactivity
	deceleration

	constructor(objet) {
		// déclare et instancie les attributs en recopiant ceux de objet
		Object.assign(this, objet)
	}
}