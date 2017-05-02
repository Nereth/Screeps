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

		if (this.GetState == null) {
			this.SetState = CreepUpgrader.State.Refueling;
		}
	}

	Update() {

		switch (this.GetState) {
			// Move to nearest energy storage and refuel.
			case CreepUpgrader.State.Refueling: {

				let spawn = this.room.find(FIND_MY_SPAWNS)[0];
				console.log(this.withdraw(spawn, RESOURCE_ENERGY, this.carryCapacity));
				if (spawn.energy > 250 && this.withdraw(spawn, this.carryCapacity) != OK) {
					this.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } });
				}

				if (this.carry.energy == this.carryCapacity) {
					this.say('? upgrade');
					this.SetState = CreepUpgrader.State.Upgrading;
				}
			}
				break;
			// Upgrade room controller.
			case CreepUpgrader.State.Upgrading: {

				if (this.carry.energy == 0) {
					this.say('?? harvest');
					this.SetState = CreepUpgrader.State.Refueling;
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