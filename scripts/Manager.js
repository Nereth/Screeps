const ManagerBuild = require('Manager.Build');
const ManagerSpawn = require('Manager.Spawn');

var Manager = {
	Spawn: ManagerSpawn,
	Build: ManagerBuild,

	PreUpdate: function() {
		this.Spawn.PreUpdate();
	},

	Update: function () {
		this.Spawn.Update();
		this.Build.Update();
	},
}

module.exports = Manager;