var creep = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.memory.role == 'harvester') {
			this.harvester.run(creep);
		}
		else if (creep.memory.role == 'upgrader') {
			this.upgrader.run(creep);
		}
		else if (creep.memory.role == 'builder') {
			this.builder.run(creep);
		}
		else if (creep.memory.role == 'container') {
			this.container.run(creep);
		}
	},

	container: {
		/** @param {Creep} creep **/
		run: function (creep) {

			//var containerPos = Game.spawns[creep.memory.parent].containerPos;
			var move = creep.memory.placement;

			if (creep.pos.x == move.x &&
				creep.pos.y == move.y) {
			}
			else {
				creep.moveTo(move.x, move.y);
			}

			/*
			if (creep.carry.energy < creep.carryCapacity) {
				var sources = creep.room.find(FIND_SOURCES);
				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
				}
			}
			else {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
					}
				});
				if (targets.length > 0) {
					if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
			*/
		}
	},

	harvester: {
		/** @param {Creep} creep **/
		run: function (creep) {
			if (creep.carry.energy < creep.carryCapacity) {
				var sources = creep.room.find(FIND_SOURCES);
				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
				}
			}
			else {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
					}
				});
				if (targets.length > 0) {
					if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
		}
	},


	upgrader: {
		/** @param {Creep} creep **/
		run: function (creep) {

			if (creep.memory.upgrading && creep.carry.energy == 0) {
				creep.memory.upgrading = false;
				creep.say('harvest');
			}
			if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
				creep.memory.upgrading = true;
				creep.say('upgrade');
			}

			if (creep.memory.upgrading) {
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
			else {
				var sources = creep.room.find(FIND_MY_SPAWNS);
				if (creep.moveTo(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
				}
			}
		}
	},

	builder: {
		/** @param {Creep} creep **/
		run: function (creep) {

			if (creep.memory.building && creep.carry.energy == 0) {
				creep.memory.building = false;
				creep.say('harvest');
			}
			if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
				creep.memory.building = true;
				creep.say('build');
			}

			if (creep.memory.building) {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if (targets.length) {
					var site = creep.pos.findClosestByPath(targets);
					if (creep.build(site) == ERR_NOT_IN_RANGE) {
						creep.moveTo(site, { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
			}
			else {
				var sources = creep.room.find(FIND_MY_SPAWNS);
				if (creep.moveTo(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
				}
			}
		}
	}
};

module.exports = creep;