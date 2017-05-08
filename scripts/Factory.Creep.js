const Type = { Creep: require('./Type.Creep') }

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

		if (this.request == null) {
			this.request = newRequest;
		}
		else {
			if (this.request.priority < newRequest.priority) {
				this.request = newRequest;
			}
		}
	}

	/**
	 * Sorts creep creation requests, sends newly created
	 * name and type for creep to the crew that requested them.
	 */
	HandleRequests() {

		// Check if we have a request.
		if (this.request != null) {
			// Find a spawner that can fullfill the request.
			for (let name in Game.spawns) {
				let spawn = Game.spawns[name];
				let type = Type.Creep[this.request.type];
				if (spawn.canCreateCreep(type.Level[0]) == OK) {
					// Request creep be created and send its name to the crew it belongs too.
					let name = spawn.createCreep(type.Level[0], null, { type: this.request.type });
					this.request.crew.AddCreep(name);
					this.request = null;
					break;
				}
			}
		}
	}

	Update() {
		this.HandleRequests();
	}
};

const CreepFactoryInstance = new CreepFactory();
module.exports = CreepFactoryInstance;