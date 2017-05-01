
class BaseSpawn extends StructureSpawn {

	/**
	* @param {StructureSpawn} spawn
	*/
	constructor(spawn) {
		Object.assign(StructureSpawn);
		super(spawn.id);
	}

	/**
	* Updates spawn every tick.
	*/
	Update() {
	}
};

module.exports = BaseSpawn;