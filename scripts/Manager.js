const ManagerBuild = require('Manager.Build');

var Manager = {
	Build: ManagerBuild,

	Update: function () {
		this.Build.Update();
	}
}

module.exports = Manager;