const Type = require('./Type');

class CreepFactory {
	constructor() {
		this.request = null;
	}

	/**
	* Request a certain certain creep be created.
	* @param {Crew} crew
	* @param {Type.Creep} type
	*/
	RequestCreep(crew, type) {
		var request = { crew: crew, type: type };

		//if (this.request != null && this.request.type == Type.Creep.Miner[0]) {
		//	return;
		//}
		//else {
			this.request = request;
		//}
	}

	/**
	 * Sorts creep creation requests, sends newly created
	 * name and type for creep to the crew that requested them.
	 */
	HandleRequests() {

		if (this.request != null) {
			Object.keys(Game.spawns).forEach(spawnName => {
				let spawn = Game.spawns[spawnName];
				if (spawn.canCreateCreep(this.request.type) == OK) {
					let name = spawn.createCreep(this.request.type);
					this.request.crew.AddCreep(name, this.request.type);
					this.request = null;
					return;
				}
			});
		}
	}

	Update() {
		this.HandleRequests();
	}
};

module.exports = CreepFactory;