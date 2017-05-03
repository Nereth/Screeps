const CrewBase = require('./Crew.Base');
const CreepUpgrader = require('./Creep.Upgrader');
const Type = require('./Type');
const Factory = require('./Factory')

class CrewInfastructure extends CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		super(memory);
	}

	Update() {
		if (this.creeps.length == 0) {
			Factory.Creep.RequestCreep(this, Type.Creep.Upgrader.Id, 5);
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
	}
};

module.exports = CrewInfastructure;