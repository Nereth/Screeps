const CreepBase = require('./Creep.Base');

class CreepCourier extends CreepBase {

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

		if (this.State == null) {
			this.State = CreepCourier.State.Obtain;
		}
	}

	Update() {

		switch (this.State) {
			// Move to nearest energy storage and refuel.
			case CreepCourier.State.Obtain: {
				if (this.TakeFrom != null) {
					var source = Game.getObjectById(this.TakeFrom);
					if (this.transfer(source, RESOURCE_ENERGY, this.carryCapacity) == ERR_NOT_IN_RANGE) {
						this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
					}
					else if (this.carry.energy == this.carryCapacity) {
						this.State = CreepCourier.State.Return;
					}
				}
			}
				break;
			// Upgrade room controller.
			case CreepCourier.State.Return: {
				if (this.carry.energy == 0) {
					this.State = CreepCourier.State.Obtain;
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

module.exports = CreepCourier;