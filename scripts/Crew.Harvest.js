const CrewBase = require('./Crew.Base');
const Factory = require('./Factory')
const Type = { Creep: require('./Type.Creep') }

class CrewHarvest extends CrewBase {

	get source() { return this.memory.source; }
	set source(id) { this.memory.source = id; }

	/**
	* @param {Room}		room
	* @param {string}	role
	* @param {number}	id
	*/
	constructor(room, role, id) {
		super(room, role, id);

		// Prep miner list alias
		if (this.creeps[Type.Creep.Miner.Id] == null)
			this.creeps[Type.Creep.Miner.Id] = [];

		this.miners = this.creeps[Type.Creep.Miner.Id];

		// Prep courier list alias
		if (this.creeps[Type.Creep.Courier.Id] == null)
			this.creeps[Type.Creep.Courier.Id] = [];

		this.couriers = this.creeps[Type.Creep.Courier.Id];
	}

	Update() {
		if (this.miners.length < 2) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner.Id, 10);
		}

		//if (this.couriers.length == 0) {
		//	Factory.Creep.RequestCreep(this, Type.Creep.Courier.Id, 9);
		//}

		Object.keys(this.creeps).forEach(type => {
			this.creeps[type].forEach(creep => {
				if (creep.spawning == false) {
					creep.Update();
				}
			});
		});
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {
		creep.TakeFrom = this.source;
		creep.TakeTo = Game.spawns['Spawn1'].id;
	}
};

module.exports = CrewHarvest;