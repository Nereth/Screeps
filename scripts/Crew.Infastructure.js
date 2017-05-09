const CrewBase = require('./Crew.Base');
const Type = { Creep: require('./Type.Creep') }
const Factory = require('./Factory')

class CrewInfastructure extends CrewBase {
	/**
	* @param {Room}		room
	* @param {string}	role
	* @param {number}	id
	*/
	constructor(room, role, id) {
		super(room, role, id);

		// Prep upgrader list alias
		if (this.creeps[Type.Creep.Upgrader.Id] == null)
			this.creeps[Type.Creep.Upgrader.Id] = [];

		this.upgraders = this.creeps[Type.Creep.Upgrader.Id];

		// Prep builder list alias
		if (this.creeps[Type.Creep.Builder.Id] == null)
			this.creeps[Type.Creep.Builder.Id] = [];

		this.builders = this.creeps[Type.Creep.Builder.Id];
	}

	Update() {
		if (this.upgraders.length < 1) {
			Factory.Creep.RequestCreep(this, Type.Creep.Upgrader.Id, 5);
		}

		if (this.builders.length < 3) {
			Factory.Creep.RequestCreep(this, Type.Creep.Builder.Id, 5);
		}

		Object.keys(this.creeps).forEach(type => {
			this.creeps[type].forEach(creep => {
				if(creep.spawning == false)
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