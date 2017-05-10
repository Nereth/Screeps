
class BuildManager {
	constructor() {
		this.request = null;

		if(Memory.managers == null) { Memory.managers = {}; }
		if(Memory.managers.build == null) { Memory.managers.build = {}; }
	}

	Update() {
	}
};

const BuildManagerInstance = new BuildManager();
module.exports = BuildManagerInstance;