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

		// Check if we have a request.
		if (this.request != null) {
			// Find a spawner that can fullfill the request.
			Object.keys(Game.spawns).forEach(spawnName => {
				let spawn = Game.spawns[spawnName];
				let type = Type.Creep[this.request.type];

				if (spawn.canCreateCreep(type.Level[0]) == OK) {
					// Create our requested creep and assign its type.
					let creep = Game.creeps[spawn.createCreep(type.Level[0])];
					creep.memory.type = type.Id;

					// Send newly created creeps id to the crew making the request.
					this.request.crew.AddCreep(creep.name);
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