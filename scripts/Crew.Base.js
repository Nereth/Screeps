const Type = require('./Type');
const Factory = require('./Factory')

class CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		this.memory = memory;

		if (this.memory.creeps == null)
			this.memory.creeps = new Array();

		// Prepare list of creeps.
		this.creeps = new Array();
		this.memory.creeps.forEach(name => {
			// If creep is dead, dispose of its memory.
			let creep = Game.creeps[name];
			if (creep == null) {
				delete Memory.creeps[name];
			}
			else {
				let classType = Type.Creep[creep.memory.type].Class;

				if (classType == null)
					console.log('Creep Type', creep.memory.type, 'is missing class propety!');
				else
					this.creeps.push(new classType(creep));
			}
		});
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		this.memory.creeps.push(name);
	}
};

module.exports = CrewBase;