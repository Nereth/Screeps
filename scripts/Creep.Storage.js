const CreepBase = require('./Creep.Base');

class CreepStorage extends CreepBase {

	static get State() {
		return {
			Idle: 0,
			Move: 1,
		};
	}

	get Location() { return this.memory.location; }

	set Location(location) { this.memory.location = location; }

	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);

		if (this.State == null) {
			this.State = CreepStorage.State.Idle;
		}
	}

	Update() {
		
		switch (this.State) {
			// Move to enery source and harvest it.
			case CreepStorage.State.Idle: {

				if (this.Location != this.pos) {
					this.State = CreepStorage.State.Move;
				}
			}
				break;
			// Move to drop location and transfer energy to it.
			case CreepStorage.State.Move: {

				this.moveTo(location, { visualizePathStyle: { stroke: '#ffaa00' } });

				if (this.Location == this.pos)
					this.State = CreepStorage.State.Idle;
			}
				break;
		}
	}
};

module.exports = CreepStorage;