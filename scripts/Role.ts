
export module Role {
	export enum Unit {
		Unknown,
		Miner,
		Courier,
		Storage,
	}

	export enum Crew {
		Unknown,
		Harvest,
	}
}

/*
const RoleCreep = require('./Role.Creep');
const RoleCrew = require('./Role.Crew');

const Role = {
	Creep: RoleCreep,
	Crew: RoleCrew,
};

module.exports = Role;
*/