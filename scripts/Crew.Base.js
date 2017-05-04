const Type = require('./Type');
const Factory = require('./Factory')

class CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		this.memory = memory;

		if (this.memory.creeps == null)
			this.memory.creeps = {};

		// Prepare list of creeps.
		this.creeps = {};
		Object.keys(this.memory.creeps).forEach(creepType => {
			let creeps = this.memory.creeps[creepType];
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
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		let creep = Game.creeps[name];

		if (this.memory.creeps[creep.memory.type] == null) {
			this.memory.creeps[creep.memory.type] = [];
		}

		this.memory.creeps[creep.memory.type].push(name);
	}
};

module.exports = CrewBase;