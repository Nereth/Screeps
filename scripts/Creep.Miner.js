const CreepBase = require('./Creep.Base');

class CreepMiner extends CreepBase {
	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);
	}

	Update() {
		if (this.carry.energy < this.carryCapacity) {
			var source = Game.getObjectById(this.memory.source);
			if (this.harvest(source) == ERR_NOT_IN_RANGE) {
				this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
		else {
			var targets = this.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
				}
			});
			if (targets.length > 0) {
				if (this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}

	}
};

module.exports = CreepMiner;