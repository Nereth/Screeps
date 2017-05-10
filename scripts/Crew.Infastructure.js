const CrewBase = require('./Crew.Base');
const Role = { Creep: require('./Role.Creep') }
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
		if (this.creeps[Role.Creep.Upgrader.Id] == null)
			this.creeps[Role.Creep.Upgrader.Id] = [];

		this.upgraders = this.creeps[Role.Creep.Upgrader.Id];

		// Prep builder list alias
		if (this.creeps[Role.Creep.Builder.Id] == null)
			this.creeps[Role.Creep.Builder.Id] = [];

		this.builders = this.creeps[Role.Creep.Builder.Id];

		// Initialize creep counts.
		if(this.creepsCountCurrent[Role.Creep.Upgrader.Id] == null) { this.creepsCountCurrent[Role.Creep.Upgrader.Id] = 0; }
		if(this.creepsCountCurrent[Role.Creep.Builder.Id] == null)	{ this.creepsCountCurrent[Role.Creep.Builder.Id] = 0; }

		// Initialize max creep counts.
		if(this.creepsCountMax[Role.Creep.Upgrader.Id] == null) { this.creepsCountMax[Role.Creep.Upgrader.Id] = 1; }
		if(this.creepsCountMax[Role.Creep.Builder.Id] == null) 	{ this.creepsCountMax[Role.Creep.Builder.Id] = 2; }
	}

	Update() {
		if (this.creepsCountCurrent[Role.Creep.Upgrader.Id] < this.creepsCountMax[Role.Creep.Upgrader.Id]) {
			Factory.Creep.RequestCreep(this, Role.Creep.Upgrader.Id, 5);
		}

		if (this.creepsCountCurrent[Role.Creep.Builder.Id] < this.creepsCountMax[Role.Creep.Builder.Id]) {
			Factory.Creep.RequestCreep(this, Role.Creep.Builder.Id, 5);
		}

		Object.keys(this.creeps).forEach(role => {
			this.creeps[role].forEach(creep => {
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