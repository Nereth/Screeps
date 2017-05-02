const Type = require('./Type');

class CreepFactory {
	constructor() {
		this.request = null;
	}

	/**
	* Request a certain certain creep be created.
	* @param {Crew} crew
	* @param {Type.Creep} type
	* @param {number} priority
	*/
	RequestCreep(crew, type, priority) {
		let newRequest = { crew: crew, type: type, priority: priority };

		if (this.request != null) {
			if (newRequest.priority > this.request.priority) {
				this.request = newRequest;
				return;
			}
		}

		this.request = newRequest;
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

const CreepFactoryInstance = new CreepFactory();
module.exports = CreepFactoryInstance;