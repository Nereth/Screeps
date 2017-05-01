const Type = require('./Type');

class CreepFactory {
	constructor() {
		this.createQueue = new Array();
	}

	/**
	* Request a certain certain creep be created.
	* @param {Crew} crew
	* @param {Type.Creep} type
	*/
	RequestCreep(crew, type) {
		this.createQueue.push({ crew: crew, type: type });
	}

	/**
	 * Sorts creep creation requests, sends newly created
	 * name and type for creep to the crew that requested them.
	 */
	HandleRequests() {

		if (this.createQueue.length > 0) {

			this.createQueue.reverse();

			let request = this.createQueue.pop();
			Object.keys(Game.spawns).forEach(spawnName => {
				let spawn = Game.spawns[spawnName];
				if (spawn.canCreateCreep(request.type) == OK) {
					let name = spawn.createCreep(request.type);
					request.crew.AddCreep(name, request.type);
					
				}
			});

			this.createQueue = new Array();
		}
	}

	Update() {
		this.HandleRequests();
	}
};

module.exports = CreepFactory;