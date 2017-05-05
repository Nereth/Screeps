const CrewBase = require('./Crew.Base');
const CreepMiner = require('./Creep.Miner');
const CreepCourier = require('./Creep.Courier');
const Type = require('./Type');
const Factory = require('./Factory')

class CrewHarvest extends CrewBase {
	/**
	* @param {Memory} memory
	*/
	constructor(memory) {
		super(memory);

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
		if (this.miners.length == 0) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner.Id, 10);
		}

		//if (this.couriers.length == 0) {
		//	Factory.Creep.RequestCreep(this, Type.Creep.Courier.Id, 9);
		//}

		Object.keys(this.creeps).forEach(type => {
			this.creeps[type].forEach(creep => {
				creep.Update();
			});
		});
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {
		console.log(creep.name, 'Activated!');
		console.log(this.memory.source);
		
		creep.TakeFrom = this.memory.source;
		creep.TakeTo = Game.spawns['Spawn1'].id;
	}
};

module.exports = CrewHarvest;