const Type = require('./Type');
const Factory = require('./Factory')

class CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		this.memory = memory;

		if (this.memory.creeps == null)
			this.memory.creeps = { inactive: [], active: [] };

		let inactiveCreeps = this.memory.creeps.inactive;
		let activeCreeps = this.memory.creeps.active;

		// Prepare list of creeps.
		this.creeps = {};
		for (let i = activeCreeps.length - 1; i >= 0; --i) {
			let creep = Game.getObjectById(activeCreeps[i]);

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				activeCreeps.splice(i, 1);
				delete Memory.creeps[creep.name];
			}
			// If creep is alive, assign is a creep class based on type.
			else {
				let creepType = creep.memory.type;
				let creepClass = Type.Creep[creepType].Class;

				if (creepClass == null) {
					console.log('Creep Type', creepClass, 'is missing class propety!');
				}
				else {
					if (this.creeps[creepType] == null)
						this.creeps[creepType] = [];

					let creepsOfType = this.creeps[creepType];
					creepsOfType.push(new creepClass(creep));
				}
			}
		}

		// Check if any inactive creeps are now active.
		for (let i = inactiveCreeps.length - 1; i >= 0; --i) {
			let creep = Game.creeps[inactiveCreeps[i]];
			// If creep is dead, dispose of its memory.
			if (creep == null) {
				inactiveCreeps.splice(i, 1);
				delete Memory.creeps[inactiveCreeps[i]];
			}
			// Creep is done spawning. Add it to active list.
			else if (creep.id != null && creep.spawning == false) {
				activeCreeps.push(creep.id);
				inactiveCreeps.splice(i, 1);

				let creepType = creep.memory.type;
				let creepClass = Type.Creep[creepType].Class;

				if (creepClass == null) {
					console.log('Creep Type', creepClass, 'is missing class propety!');
				}
				else {
					if (this.creeps[creepType] == null)
						this.creeps[creepType] = [];

					let creepsOfType = this.creeps[creepType];
					this.CreepActivated(new creepClass(creep));
				}
			}
		}
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		this.memory.creeps.inactive.push(name);
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {
	}
};

module.exports = CrewBase;