const Type = { Creep: require('./Type.Creep') };
const Factory = require('./Factory')

class CrewBase {

	get memory() { return Memory.rooms[this.room].crews[this.role][this.id]; }
	set memory(obj) { Memory.rooms[this.room].crews[this.role][this.id] = obj; }

	get inactiveCreeps() { return this.memory.creeps.inactive; }

	get activeCreeps() { return this.memory.creeps.active; }

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

		if (this.memory == null) {
			this.memory = { state: 0, creeps: { inactive: [], active: [] } };
		}

		this.creeps = {};

		// Check if any inactive creeps can be activated
		this.inactiveCreeps.forEach(name => {
			let creep = Game.creeps[name];

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				this.inactiveCreeps.splice(this.inactiveCreeps.indexOf(name), 1);
				delete Memory.creeps[name];
			}
			else {
				let creepType = creep.memory.type;

				// If creep is currently spawning add it as a dummy creep.
				if (creep.spawning == true) {

					if (this.creeps[creepType] == null)
						this.creeps[creepType] = [];

					this.creeps[creepType].push({ name: name, spawning: true });
				}
				// Creep is done spawning. Add it to active list.
				else if (creep.id != null && creep.spawning == false) {
					this.activeCreeps.push(name);
					this.inactiveCreeps.splice(this.inactiveCreeps.indexOf(name), 1);

					let creepType = creep.memory.type;
					let creepClass = Type.Creep[creepType].Class;

					if (creepClass == null) {
						console.log('Creep Type', creepClass, 'is missing class propety!');
					}
					else {
						this.CreepActivated(new creepClass(creep));
					}
				}
			}
		});
		
		// Manage active creeps.
		this.activeCreeps.forEach(name => {
			let creep = Game.creeps[name];

			// If creep is dead, dispose of its memory.
			if (creep == null) {
				this.activeCreeps.splice(this.activeCreeps.indexOf(name), 1);
				delete Memory.creeps[name];
			}
			// If creep is alive, assign is a creep class based on type.
			else {
				let creepType = creep.memory.type;

				if (this.creeps[creepType] == null)
					this.creeps[creepType] = [];

				let creepClass = Type.Creep[creepType].Class;

				if (creepClass == null) {
					console.log('Creep Type', creepClass, 'is missing class propety!');
				}
				else {
					this.creeps[creepType].push(new creepClass(creep));
				}
			}
		});
	}

	/**
	* @param {string} name
	*/
	AddCreep(name) {
		this.inactiveCreeps.push(name);
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {
	}
};

module.exports = CrewBase;