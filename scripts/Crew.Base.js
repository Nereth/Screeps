const Type = require('./Type');
const Factory = require('./Factory')

class CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		this.memory = memory;
	}

	Update() {
	}

	/**
	* @param {Creep} creep
	*/
	AddCreep(creep) {
	}
};

module.exports = CrewBase;