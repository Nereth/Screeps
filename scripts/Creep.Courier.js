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

		if (this.GetState == null) {
			this.SetState = CreepCourier.State.Obtain;
		}
	}

	Update() {

		switch (this.GetState) {
			// Move to nearest energy storage and refuel.
			case CreepCourier.State.Obtain: {

				if (this.TakeFrom != null) {
					var source = Game.getObjectById(this.TakeFrom);
					if (this.transfer(source, RESOURCE_ENERGY, this.carryCapacity) == ERR_NOT_IN_RANGE) {
						this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
					}
				}
			}
				break;
			// Upgrade room controller.
			case CreepCourier.State.Return: {

				/*
				if (this.carry.energy == 0) {
					this.say('?? harvest');
					this.SetState = CreepUpgrader.State.Refueling;
				}

				if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
					this.moveTo(this.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
				}
				*/
			}
				break;
		}
	}
};

module.exports = CreepCourier;