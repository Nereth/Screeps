const CreepMiner	= require('./Creep.Miner');
const CreepUpgrader	= require('./Creep.Upgrader');
const CreepCourier	= require('./Creep.Courier');
const CreepStorage = require('./Creep.Storage');
const CreepBuilder= require('./Creep.Builder');

const TypeCreep = {
	Miner: {
		Id: 'Miner',
		Class: CreepMiner,
		Level: [
			[WORK, CARRY, MOVE],		// Level 0
			[WORK, WORK, CARRY, MOVE],	// Level 1
		],
	},
	Courier: {
		Id: 'Courier',
		Class: CreepCourier,
		Level: [
			[CARRY, CARRY, MOVE],			// Level 0
			[CARRY, CARRY, CARRY, MOVE],	// Level 1
		],
	},
	Upgrader: {
		Id: 'Upgrader',
		Class: CreepUpgrader,
		Level: [
			[WORK, CARRY, MOVE],		// Level 0
			[WORK, WORK, CARRY, MOVE],	// Level 1
		],
	},
	Storage: {
		Id: 'Storage',
		Class: CreepStorage,
		Level: [
			[CARRY, CARRY, CARRY, CARRY, MOVE],		// Level 0
			[CARRY, CARRY, CARRY, CARRY, MOVE],		// Level 0
		],
	},
	Builder: {
		Id: 'Builder',
		Class: CreepBuilder,
		Level: [
			[WORK, CARRY, MOVE],		// Level 0
			[WORK, WORK, CARRY, MOVE],	// Level 1
		],
	},
};

module.exports = TypeCreep;