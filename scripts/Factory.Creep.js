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
	* @param {Memory} memory
	*/
	RequestCreep(crew, type, priority, memory) {
		let newRequest = { crew: crew, type: type, priority: priority, memory: memory };
		
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

		// Check if request has been fu

		// Check if we have a request.
		if (this.request != null) {
			// Find a spawner that can fullfill the request.
			Object.keys(Game.spawns).forEach(spawnName => {
				let spawn = Game.spawns[spawnName];
				let type = Type.Creep[this.request.type];

				if (spawn.canCreateCreep(type.Level[0]) == OK) {
					// Request creep be created and send its name to the crew it belongs too.
					let name = spawn.createCreep(type.Level[0]);
					Game.creeps[name].memory.type = this.request.type;
					this.request.crew.AddCreep(name);
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