const CrewBase = require('./Crew.Base');
const CreepMiner = require('./Creep.Miner');
const Type = require('./Type');
const Factory = require('./Factory')

class CrewHarvest extends CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		super(memory);

		this.memory = memory;

		let creepMiner = Game.creeps[this.memory.miner];
		if (creepMiner != null && creepMiner != null) {
			this.miner = new CreepMiner(creepMiner);
		}
	}

	Update() {
		if (this.miner == undefined) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner[0]);
		}
		else {
			this.miner.Update();
		}
	}

	/**
	* @param {string} name
	* @param {Type.Creep} type
	*/
	AddCreep(name, type) {
		if (type == Type.Creep.Miner[0]) {
			this.memory.miner = name;
			Game.creeps[name].memory.source = this.memory.source;
		}
	}
};

module.exports = CrewHarvest;