const Role = { Creep: require('./Role.Creep') }

class ManagerSpawn {

	get requests() { return Memory.managers.spawn.requests; }
	set requests(requests) { Memory.managers.spawn.requests = requests; }

	get reserves() { return Memory.managers.spawn.reserves; }
	set reserves(reserves) { Memory.managers.spawn.reserves = reserves; }

	constructor() {
		if(Memory.managers == null) { Memory.managers = {}; }
		if(Memory.managers.spawn == null) { Memory.managers.spawn = {}; }
		if(Memory.managers.spawn.requests == null) { Memory.managers.spawn.requests = []; }
		if(Memory.managers.spawn.reserves == null) { Memory.managers.spawn.reserves = []; }
	}

	/**
	* Request a certain certain creep be created.
	* If requested creep type is spawned, return it.
	* @param {Role.Creep} role
	* @param {number} priority
	* @param {string} creep
	*/
	RequestCreep(role, priority) {
		let request = { name: null, role: role, priority: priority };
		
		if(this.reserves.length != 0) {
			for(let i in this.reserves) {
				let reserve = this.reserves[i];
				if(request.role == reserve.role && request.priority == reserve.priority) {
					return this.reserves.splice(i, 1)[0].name;
				}
			}
		}
		else if(this.requests.length == 0) {
			this.requests.push(request);
		}
		else {
			for(let i in this.requests) {
				if(this.requests[i].priority < request.priority) {
					this.requests.splice(i, 0, request);
					break;
				}
			}
		}
	}

	/**
	 * Sorts creep creation requests, sends newly created
	 * name and role for creep to the crew that requested them.
	 */
	HandleRequests() {

		for(let name in Game.spawns) {
			for(let i in this.requests) {
				let spawn = Game.spawns[name];
				let request = this.requests[i];
				let role = Role.Creep[request.role];

				if (spawn.canCreateCreep(role.Level[0]) == OK) {
					let name = spawn.createCreep(role.Level[0], null, { role: request.role });
					if(name != null) {
						request.name = name;
						this.reserves.push(request);
						this.requests.splice(i, 1);
						break;
					}
				}
			}
		}

		this.requests = [];

		/*
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
		*/
	}

	PreUpdate() {
		this.HandleRequests();
	}

	Update() {
	}
};

const ManagerSpawnInstance = new ManagerSpawn();
module.exports = ManagerSpawnInstance;