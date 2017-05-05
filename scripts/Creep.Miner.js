const CreepBase = require('./Creep.Base');

class CreepMiner extends CreepBase {
	static get State() {
		return {
			Obtain: 0,
			Return: 1,
		};
	}

	get TakeWhat() { return this.memory.takeWhat; }
	get TakeFrom() { return this.memory.takeFrom; }
	get TakeTo() { return this.memory.takeTo; }

	set TakeWhat(takeWhat) { this.memory.takeWhat = takeWhat; }
	set TakeFrom(takeFrom) { this.memory.takeFrom = takeFrom; }
	set TakeTo(takeTo) { this.memory.takeTo = takeTo; }

	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);

		if (this.State == null)
			this.State = CreepMiner.State.Obtain;
	}

	Update() {
		
		switch (this.State) {
			// Move to enery source and harvest it.
			case CreepMiner.State.Obtain: {
				if (this.carry.energy == this.carryCapacity) {
					this.State = CreepMiner.State.Return;
					console.log(this.State);
				}
				else if (this.TakeFrom != null) {
					var source = Game.getObjectById(this.TakeFrom);
					if (this.harvest(source) == ERR_NOT_IN_RANGE) {
						this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
					}
				}
			}
				break;
			// Move to drop location and transfer energy to it.
			case CreepMiner.State.Return: {
				
				if (this.carry.energy == 0) {
					this.State = CreepMiner.State.Obtain;
				}
				else if (this.TakeTo != null) {
					var storage = Game.getObjectById(this.TakeTo);
					if (this.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
				break;
		}
	}
};

module.exports = CreepMiner;