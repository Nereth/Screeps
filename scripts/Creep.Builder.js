const CreepBase = require('./Creep.Base');

class CreepBuilder extends CreepBase {

	static get State() {
		return {
			Refueling: 0,
			Building: 1,
		};
	}

	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);

		if (this.State == null) {
			this.State = CreepBuilder.State.Refueling;
		}
	}

	Update() {
		switch (this.State) {
			// Move to nearest energy storage and refuel.
			case CreepBuilder.State.Refueling: {

				let spawn = this.room.find(FIND_MY_SPAWNS)[0];
				this.withdraw(spawn, RESOURCE_ENERGY, this.carryCapacity);
				if (spawn.energy > 250 && this.withdraw(spawn, this.carryCapacity) != OK) {
					this.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } });
				}

				if (this.carry.energy == this.carryCapacity) {
					this.State = CreepBuilder.State.Building;
				}
			}
				break;
			// Upgrade room controller.
			case CreepBuilder.State.Building: {
				if (this.carry.energy == 0) {
					this.State = CreepBuilder.State.Refueling;
				}

				var targets = this.room.find(FIND_CONSTRUCTION_SITES);
				if (targets.length) {
					if (this.build(targets[0]) == ERR_NOT_IN_RANGE) {
						this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
				break;
		}
	}
};

module.exports = CreepBuilder;