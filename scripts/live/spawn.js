var roles = require('roles');

var spawn = {
	role: {
		mother: {
			/** @param {Spawn} spawn **/
			run: function (spawn) {

				var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
				console.log('Harvesters: ' + harvesters.length);

				if (harvesters.length < 2) {
					var newName = spawn.createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' });
					console.log('Spawning new harvester: ' + newName);
				}

				var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
				console.log('Upgrader: ' + upgraders.length);

				if (harvesters.length > 0 && upgraders.length < 2) {
					var newName = spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader' });
					console.log('Spawning new upgrader: ' + newName);
				}

				var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
				console.log('Builders: ' + upgraders.length);

				if (harvesters.length > 0 && builders.length < 2) {
					var newName = spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'builder' });
					console.log('Spawning new builder: ' + newName);
				}

				if (harvesters.length >= 2) {
					for (var name in Game.creeps) {
						if (Game.creeps[name].memory.role != 'harvester')
							spawn.transferEnergy(Game.creeps[name]);
					}
				}

				for (var name in Game.creeps) {
					roles.creep.run(Game.creeps[name]);
				}
			}
		}
	}
};

module.exports = spawn;