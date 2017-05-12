const CrewBase = require('./Crew.Base');
const Role = { Creep: require('./Role.Creep') }
const Factory = require('./Factory')
const Manager = require('./Manager')

class CrewInfastructure extends CrewBase {
	
	get construct() { return this.memory.construct; }
	set construct(id) {
		this.memory.construct = id;

		this.builders.forEach(builder =>{
			builder.construct = this.construct;
		});
	}

	get repair() { return this.memory.repair; }
	set repair(id) { this.memory.repair = id; }
	
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

		if(this.construct == null) {
			this.construct = Manager.Build.RequestTask();
		}
		else {
			let construct = Game.getObjectById(this.construct);

			if(construct == null) {
				this.construct = null;
			}
		}

		Object.keys(this.creeps).forEach(role => {
			this.creeps[role].forEach(creep => {
				if(creep.spawning == false) {
					creep.Update();
				}
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