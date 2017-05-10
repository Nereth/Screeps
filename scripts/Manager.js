const BuildManager = require('Manager.Build');

var Manager = {
	Build: BuildManager,

	Update: function () {
		this.Build.Update();
	}
}

module.exports = Manager;