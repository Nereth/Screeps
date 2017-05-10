
class BuildManager {
	constructor() {
		this.request = null;
	}

	/**
	* Request a certain certain creep be created.
	* @param {Crew} crew
	* @param {Role.Creep} role
	* @param {number} priority
	*/
	RequestCreep(crew, role, priority) {
		let newRequest = { crew: crew, role: role, priority: priority };

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
	 * name and role for creep to the crew that requested them.
	 */
	HandleRequests() {

		// Check if we have a request.
		if (this.request != null) {
			// Find a spawner that can fullfill the request.
			for (let name in Game.spawns) {
				let spawn = Game.spawns[name];
				let role = Role.Creep[this.request.role];
				if (spawn.canCreateCreep(role.Level[0]) == OK) {
					// Request creep be created and send its name to the crew it belongs too.
					let name = spawn.createCreep(role.Level[0], null, { role: this.request.role });
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

const BuildManagerInstance = new BuildManager();
module.exports = BuildManagerInstance;