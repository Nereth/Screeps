const CreepBase = require('./Creep.Base');

class CreepUpgrader extends CreepBase {
	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);
	}

	Update() {

		if (this.memory.upgrading && this.carry.energy == 0) {
			this.memory.upgrading = false;
			this.say('?? harvest');
		}
		if (!this.memory.upgrading && this.carry.energy == this.carryCapacity) {
			this.memory.upgrading = true;
			this.say('? upgrade');
		}

		if (this.memory.upgrading) {
			if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
				this.moveTo(this.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
		else {
			var source = Game.getObjectById(this.memory.source);
			if (this.harvest(source) == ERR_NOT_IN_RANGE) {
				this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}

	}
};

module.exports = CreepUpgrader;