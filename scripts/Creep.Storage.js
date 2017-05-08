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

	get Accessors() { return this.memory.accessors; }
	set Accessors(accessors) { this.memory.accessors = accessors; }

	/**
	* @param {Creep} creep
	*/
	constructor(creep) {
		super(creep);

		if (this.State == null) {
			this.State = CreepStorage.State.Idle;
		}

		if (this.Accessors == null) {
			this.Accessors = [];
		}
	}

	Update() {
		
		switch (this.State) {
			// Move to enery source and harvest it.
			case CreepStorage.State.Idle: {
				let location = new RoomPosition(this.Location.x, this.Location.y, this.Location.roomName);

				this.Accessors.forEach(accessor => {
					this.transfer(Game.getObjectById(accessor), RESOURCE_ENERGY);
				});

				if (!location.isEqualTo(this.pos)) {
					this.State = CreepStorage.State.Move;
				}
			}
				break;
			// Move to drop location and transfer energy to it.
			case CreepStorage.State.Move: {
				let location = new RoomPosition(this.Location.x, this.Location.y, this.Location.roomName);
				this.moveTo(location, { visualizePathStyle: { stroke: '#ffaa00' } });

				if (location.isEqualTo(this.pos)) {
					this.State = CreepStorage.State.Idle;
				}
			}
				break;
		}
	}
};

module.exports = CreepStorage;