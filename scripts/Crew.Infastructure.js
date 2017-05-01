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

		this.memory = memory;

		let creepUpgrader = Game.creeps[this.memory.upgrader];

		if (creepUpgrader != null && creepUpgrader != null) {
			this.upgrader = new CreepUpgrader(creepUpgrader);
		}
	}

	Update() {
		if (this.upgrader == null) {
			Factory.Creep.RequestCreep(this, Type.Creep.Upgrader[0]);
		}
		else {
			this.upgrader.Update();
		}
	}

	/**
	* @param {string} name
	* @param {Type.Creep} type
	*/
	AddCreep(name, type) {
		if (type == Type.Creep.Upgrader[0]) {
			this.memory.upgrader = name;
			Game.creeps[name].memory.source = this.memory.source;
		}
	}
};

module.exports = CrewInfastructure;