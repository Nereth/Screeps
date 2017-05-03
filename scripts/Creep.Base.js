
class CreepBase extends Creep {
	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep.id);
	}

	static get State() { return null; }

	/**
	* Returns this creeps type.
	*/
	get Type() { return this.memory.type; }

	/**
	* Returns this creeps state.
	*/
	get State() { return this.memory.state; }

	/**
	* Sets this creeps state.
	* @param {string} state
	*/
	set State(state) { this.memory.state = state; }

	Update() {
	}
};

module.exports = CreepBase;