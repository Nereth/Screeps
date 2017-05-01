
class CreepBase extends Creep {
	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep.id);
	}

	Update() {
	}
};

module.exports = CreepBase;