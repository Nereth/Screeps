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
	* @param {string} name
	*/
	AddCreep(name) {
		CrewBase.prototype.AddCreep.call(this, name);
		let creep = Game.creeps[name];

		switch (creep.memory.type) {

			case Type.Creep.Miner.Id: {
				let miner = new CreepMiner(creep);
				miner.TakeFrom = this.memory.source;
				//miner.TakeTo = Game.spawns[0].id;
				
			}
				break;

			case Type.Creep.Courier.Id:
			{
				//let courier = new CreepCourier(Game.creeps[name].memory.type);
			}
				break;
		}
	}
};

module.exports = CrewHarvest;