

var spawn = {
	/** @param {Spawn} spawn **/
	run: function (spawn) {
		if (spawn.memory.role == 'infastructure') {
			this.infastructure.run(spawn);
		}
	},

	infastructure: {
		states: {
			startup: 1,
			carrier: 2,
		},

		/** @param {Spawn} spawn **/
		run: function (spawn) {

			if (spawn.memory.state == undefined) {
				spawn.memory.state = this.states.startup;
			}

			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
			var containers = _.filter(Game.creeps, (creep) => creep.memory.role == 'containers');

			switch (spawn.memory.state) {
				case this.states.startup:
					{
						var sources = spawn.room.find(FIND_SOURCES);
						var path = spawn.pos.findPathTo(sources[0]);

						if (path.length > 3) {
							spawn.memory.containerPos = { x: path[path.length - 3].x, y: path[path.length - 3].y };
						}

						if (spawn.spawning == null && harvesters.length == 0) {
							spawn.memory.creepBeginner = spawn.createCreep([MOVE, WORK, CARRY], undefined, { role: 'harvester', parent: spawn.name });
						}

						spawn.memory.state = this.states.carrier;
					}
					break;

				case this.states.carrier:
					{
						spawn.memory.state = this.states.carrier;
						
						if (spawn.spawning == null && containers.length == 0 && spawn.canCreateCreep([MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]) == 0) {
							spawn.memory.creepContainer = spawn.createCreep([MOVE, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, { role: 'container', placement: spawn.memory.containerPos });

							Game.creeps[spawn.memory.creepBeginner].memory.container = spawn.memory.creepContainer;

							spawn.memory.state = 0;
						}
					}
					break;
			}

			var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

			if (harvesters.length > 2 && upgraders.length < 2) {
				var newName = spawn.createCreep([MOVE, WORK, CARRY], undefined, { role: 'upgrader' });
			}

			if (harvesters.length >= 2) {
				for (var name in Game.creeps) {
					if (Game.creeps[name].memory.role != 'harvester')
						spawn.transferEnergy(Game.creeps[name]);
				}
			}
		}
	}
};

module.exports = spawn;