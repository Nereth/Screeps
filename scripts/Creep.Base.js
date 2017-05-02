
class CreepBase extends Creep {
	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep.id);
	}

	static get State() {
		return null;
	}

	get GetState() {
		return this.memory.state;
	}

	set SetState(state) {
		this.memory.state = state;
	}

	Update() {
	}
};

module.exports = CreepBase;