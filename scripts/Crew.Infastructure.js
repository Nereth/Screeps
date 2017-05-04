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

		if (this.creeps[Type.Creep.Upgrader.Id] == null)
			this.creeps[Type.Creep.Upgrader.Id] = [];

		this.upgraders = this.creeps[Type.Creep.Upgrader.Id];
	}

	Update() {
		if(this.upgraders.length == 0) {
			Factory.Creep.RequestCreep(this, Type.Creep.Upgrader.Id, 5);
		}

		Object.keys(this.creeps).forEach(type => {
			this.creeps[type].forEach(creep => {
				creep.Update();
			});
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