var roles = require('roles');

var controller = {
	role: {
		default: {
			run: function () {
				// Handle spawner logic
				for (var name in Game.spawns) {

					Game.spawns[name].memory.role = 'infastructure';

					if (Game.spawns[name].memory.role != undefined) {
						roles.spawn.run(Game.spawns[name]);
					}
				}

				// Handle creep logic
				for (var name in Game.creeps) {
					roles.creep.run(Game.creeps[name]);
				}
			}
		}
	}
};

module.exports = controller;