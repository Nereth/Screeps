const Role = { Creep: require('./Role.Creep') };
const Factory = require('./Factory')

class CrewBase {

	get memory() { return Memory.rooms[this.room].crews[this.role][this.id]; }
	set memory(obj) { Memory.rooms[this.room].crews[this.role][this.id] = obj; }

	get creepsInactive() { return this.memory.creeps.inactive; }

	get creepsActive() { return this.memory.creeps.active; }

	get creepsCountCurrent() { return this.memory.creeps.count.current; }

	get creepsCountMax() { return this.memory.creeps.count.max; }

	get state() { return this.memory.state; }
	set state(state) { this.memory.state = state; }

	/**
	* @param {Room}		room
	* @param {string}	role
	* @param {number}	id
	*/
	constructor(room, role, id) {

		this.room = room;
		this.role = role;
		this.id = id;

		// Prepare crew memory.
		if(this.memory == null)							{ this.memory = {} }
		if(this.memory.state == null) 					{ this.memory.state = 0; }
		if(this.memory.creeps == null) 					{ this.memory.creeps = {}; }
		if(this.memory.creeps.count == null) 			{ this.memory.creeps.count = {}; }
		if(this.memory.creeps.count.current == null) 	{ this.memory.creeps.count.current = {}; }
		if(this.memory.creeps.count.max == null) 		{ this.memory.creeps.count.max = {}; }
		if(this.memory.creeps.inactive == null) 		{ this.memory.creeps.inactive = []; }
		if(this.memory.creeps.active == null) 			{ this.memory.creeps.active = []; }

		this.creeps = {};

		// Check if any inactive creeps can be activated
		this.creepsInactive.forEach(name => {
			let creep = Game.creeps[name];

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				this.creepsInactive.splice(this.creepsInactive.indexOf(name), 1);
				this.creepsCountCurrent[Memory.creeps[name].role]--;
				delete Memory.creeps[name];
			}
			else {
				let creepRole = creep.memory.role;

				// If creep is currently spawning add it as a dummy creep.
				if (creep.spawning == true) {

					if (this.creeps[creepRole] == null)
						this.creeps[creepRole] = [];

					this.creeps[creepRole].push({ name: name, spawning: true });
				}
				// Creep is done spawning. Add it to active list.
				else if (creep.id != null && creep.spawning == false) {
					this.creepsActive.push(name);
					this.creepsInactive.splice(this.creepsInactive.indexOf(name), 1);

					let creepRole = creep.memory.role;
					let creepClass = Role.Creep[creepRole].Class;

					if (creepClass == null) {
						console.log('Creep Role', creepClass, 'is missing class propety!');
					}
					else {
						this.CreepActivated(new creepClass(creep));
					}
				}
			}
		});
		
		// Manage active creeps.
		this.creepsActive.forEach(name => {
			let creep = Game.creeps[name];

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				this.creepsActive.splice(this.creepsActive.indexOf(name), 1);
				this.creepsCountCurrent[Memory.creeps[name].role]--;
				delete Memory.creeps[name];
			}
			// If creep is alive, assign is a creep class based on role.
			else {
				let creepRole = creep.memory.role;

				if (this.creeps[creepRole] == null)
					this.creeps[creepRole] = [];

				let creepClass = Role.Creep[creepRole].Class;

				if (creepClass == null) {
					console.log('Creep Role', creepClass, 'is missing class propety!');
				}
				else {
					this.creeps[creepRole].push(new creepClass(creep));
				}
			}
		});
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		this.creepsInactive.push(name);
		
		let creepRole = Game.creeps[name].memory.role;

		if(this.creepsCountCurrent[creepRole] == null) {
			this.creepsCountCurrent[creepRole] = 1;
		}
		else {
			this.creepsCountCurrent[creepRole]++;
		}
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {
	}
};

module.exports = CrewBase;