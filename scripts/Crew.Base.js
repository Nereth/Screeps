const Type = require('./Type');
const Factory = require('./Factory')

class CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		this.memory = memory;

		if (this.memory.creeps == null)
			this.memory.creeps = { inactive: [], active[] };

		let inactiveCreeps = this.memory.creeps.inactive;
		let activeCreeps = this.memory.creeps.active;

		// 
		for (let i = inactiveCreeps.length - 1; i >= 0; ++i) {
			let creep = Game.creeps[inactiveCreeps[i]];
			// If creep is dead, dispose of its memory.
			if (creep == null) {
				inactiveCreeps.splice(i, 1);
				delete Memory.creeps[creep.name];
			}

			if (creep.id != null && creep.spawning == false) {
				activeCreeps.push(creep.id);
				inactiveCreeps.splice(i, 1);
			}
		}

		// Prepare list of creeps.
		this.creeps = {};
		for (let i = 0; i < activeCreeps.length; ++i) {
			let creep = Game.creeps[activeCreeps[i]];

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				activeCreeps.splice(i, 1);
				delete Memory.creeps[activeCreeps[i]];
			}
			// If creep is alive, assign is a creep class based on type.
			else {
				let type = creep.memory.type;

				if (this.creeps[type] == null)
					this.creeps[type] = [];

				let creepsOfType = this.creeps[type];
			}

		}

		/*
		this.creeps = {};
		Object.keys(activeCreeps).forEach(creepType => {

			let creeps = activeCreeps[creepType];

			for (let i = creeps.length - 1; i >= 0; --i) {
				let creep = Game.creeps[creeps[i]];

				// If creep is dead, dispose of its memory.
				if (creep == null) {
					creeps.splice(i, 1);
					delete Memory.creeps[creeps[i]];
				}
				// Assign creeps their classes
				else {
					let classType = Type.Creep[creep.memory.type].Class;

					if (classType == null) {
						console.log('Creep Type', creepType, 'is missing class propety!');
					}
					else {
						if (this.creeps[creepType] == null) {
							this.creeps[creepType] = [];
						}

						this.creeps[creepType].push(new classType(creep));
					}
				}
			}
		});
		*/
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		this.memory.creeps.inactive.push(name);
	}
};

module.exports = CrewBase;