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

		this.memory = memory;

		// Cleanup dead creeps and set logic for remaining creeps.
		if (this.memory.miner != null) {
			let creepMiner = Game.creeps[this.memory.miner];

			if (creepMiner == null) {
				delete Memory.creeps[this.miner];
				this.miner = null;
			}
			else {
				this.miner = new CreepMiner(creepMiner);
			}

			if (this.memory.courier != null) {
				let creepCourier = Game.creeps[this.memory.courier];

				if (creepCourier == null) {
					delete Memory.creeps[this.courier];
					this.courier = null;
				}
				else {
					this.courier = new CreepCourier(creepCourier);
					this.courier.TakeFrom = this.miner.id;
				}
			}
		}
	}

	Update() {
		if (this.miner == null) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner[0], 10);
		}
		else {
			this.miner.Update();
		}

		if (this.miner != null && this.courier == null) {
			Factory.Creep.RequestCreep(this, Type.Creep.Courier[0], 9);
		}

		if (this.courier != null) {
			this.courier.Update();
		}
	}

	/**
	* @param {string} name
	* @param {Type.Creep} type
	*/
	AddCreep(name, type) {
		if (type == Type.Creep.Miner[0]) {
			this.memory.miner = name;
			Game.creeps[name].memory.source = this.memory.source;
		}
		else if (type == Type.Creep.Courier[0]) {
			this.memory.courier = name;
		}
	}
};

module.exports = CrewHarvest;