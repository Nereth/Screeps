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
	}

	Update() {

		switch (this.State) {
			// Move to enery source and harvest it.
			case CreepMiner.State.Obtain: {

				if (this.carry.energy == this.carryCapacity) {
					this.State = State.Return;
				}
				else if (this.TakeFrom != null) {
					var source = Game.getObjectById(this.TakeFrom);
					if (this.withdraw(source) == ERR_NOT_IN_RANGE) {
						this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
					}
				}
			}
				break;
			// Move to drop location and transfer energy to it.
			case CreepMiner.State.Return: {
				if (this.carry.energy == 0) {
					this.State = State.Obtain;
				}
				else if (this.TakeTo != null) {
					if (this.transfer(this.TakeTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.moveTo(this.TakeTo, { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
				break;
		}

		/*
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
		*/
	}
};

module.exports = CreepMiner;