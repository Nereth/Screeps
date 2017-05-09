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
				// Check if we are at our set location. If not switch to move state.
				let location = new RoomPosition(this.Location.x, this.Location.y, this.Location.roomName);
				if (!location.isEqualTo(this.pos)) {
					this.State = CreepStorage.State.Move;
				}
				else {
					// Transfer energy to nearby objects in accessors list.
					this.Accessors.forEach(accessor => {
						if (Game.getObjectById(accessor) == null) {
							this.Accessors.splice(this.Accessors.indexOf(accessor), 1);
						}

						this.transfer(Game.getObjectById(accessor), RESOURCE_ENERGY);
					});
				}
			}
				break;
			
			case CreepStorage.State.Move: {
				// Move towards our set location.
				let location = new RoomPosition(this.Location.x, this.Location.y, this.Location.roomName);
				this.moveTo(location, { visualizePathStyle: { stroke: '#ffaa00' } });

				// If at location switch to idle state.
				if (location.isEqualTo(this.pos)) {
					this.State = CreepStorage.State.Idle;
				}
			}
				break;
		}
	}
};

module.exports = CreepStorage;