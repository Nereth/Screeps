const CrewBase = require('./Crew.Base');
const CreepMiner = require('./Creep.Miner');
const CreepCourier = require('./Creep.Courier');
const Type = require('./Type');
const Factory = require('./Factory')

class CrewHarvest extends CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		super(memory);
	}

	Update() {
		if (this.creeps.length == 0) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner.Id, 10);
		}

		this.creeps.forEach(creep => {
			creep.Update();
		});
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		CrewBase.prototype.AddCreep.call(this, name);
		Game.creeps[name].memory.source = this.memory.source;
	}
};

module.exports = CrewHarvest;