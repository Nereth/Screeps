const CreepBase = require('./Creep.Base');

class CreepUpgrader extends CreepBase {

	static get State() {
		return {
			Refueling: 0,
			Upgrading: 1,
		};
	}

	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);

		if (this.State == null) {
			this.State = CreepUpgrader.State.Refueling;
		}
	}

	Update() {
		switch (this.State) {
			// Move to nearest energy storage and refuel.
			case CreepUpgrader.State.Refueling: {

				let spawn = this.room.find(FIND_MY_SPAWNS)[0];
				this.withdraw(spawn, RESOURCE_ENERGY, this.carryCapacity);
				if (spawn.energy > 250 && this.withdraw(spawn, this.carryCapacity) != OK) {
					this.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } });
				}

				if (this.carry.energy == this.carryCapacity) {
					this.State = CreepUpgrader.State.Upgrading;
				}
			}
				break;
			// Upgrade room controller.
			case CreepUpgrader.State.Upgrading: {

				if (this.carry.energy == 0) {
					this.State = CreepUpgrader.State.Refueling;
				}

				if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
					this.moveTo(this.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
				break;
		}
	}
};

module.exports = CreepUpgrader;