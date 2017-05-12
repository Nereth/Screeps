
class ManagerBuild {

	get queueConstruction() { return Memory.managers.build.queue.construction; }

	get queueTask() { return Memory.managers.build.queue.task; }

	constructor() {
		this.request = null;

		if(Memory.managers == null) { Memory.managers = {}; }
		if(Memory.managers.build == null) { Memory.managers.build = {}; }
		if(Memory.managers.build.queue == null) { Memory.managers.build.queue = {}; }
		if(Memory.managers.build.queue.construction == null) { Memory.managers.build.queue.construction = []; }
		if(Memory.managers.build.queue.task == null) { Memory.managers.build.queue.task = []; }


	}

	Update() {
		this.queueTask.forEach(task => {
			let construction = Game.getObjectById(task);
			if(construction == null) {
				this.queueTask.splice(this.queueTask.indexOf(task), 1);
			}
		})
	}

	/**
	 * Requests a structure be built at this position.
	 * @param {string} structureType
	 * @param {RoomPosition} position
	 * @return {bool} result
	 */
	RequestConstruction(structureType, position) {
		console.log('Adding', structureType, position);

		let result = null;
		let blocked = false;
		
		// Check if requested position is blocked.
		result = position.lookFor(LOOK_CONSTRUCTION_SITES);
		blocked |= result.length;

		result = position.lookFor(LOOK_STRUCTURES);
		blocked |= result.length;

		result = position.lookFor(LOOK_TERRAIN);
		blocked |= result.length && result[0] == 'wall';

		// Convert blocked flag to boolean.
		blocked = !!blocked;

		// Check if position is already taken by a previous task.
		for (let index in this.queueConstruction) {
			let jobPos = this.queueConstruction[index].position;
			if (position.x == jobPos.x &&
				position.y == jobPos.y &&
				position.roomName == jobPos.roomName) {
				blocked = true;
				break;
			}
		};

		// If position is not blocked add to inactive job queue.
		if(blocked == false) {
			this.queueConstruction.push({structureType: structureType, position: position});
		}

		return blocked;
	}

	/**
	 * Creates construction sites and returns current build task.
	 * @return {string} constructionSite
	 */
	RequestTask() {

		console.log('Requesting Task');

		if(this.queueConstruction.length > 0)
		{
			let construction = this.queueConstruction[0];
			let position = new RoomPosition(construction.position.x, construction.position.y, construction.position.roomName);

			// Search for active construction site at this position.
			let site = position.lookFor(LOOK_CONSTRUCTION_SITES);

			// If site exists, remove from construction queue.
			// Add site id to task list.
			if(site.length > 0 && site[0].id != null) {
				// Ensure site id isnt already in task list.
				for (let index in this.queueTask) {
					if(site[0].id == this.queueTask[index]) {
						return null;
					}
				};

				this.queueTask.push(site[0].id);
				this.queueConstruction.splice(0, 1);

				return site[0].id;
			}
			// If site does not exist, create the site.
			else {
				var createResult = Game.rooms[position.roomName].createConstructionSite(position, construction.structureType);

				// If error occurred during site creation, assume site
				// is invalid and remove it from construction queue.
				if(createResult != OK) {
					this.queueConstruction.splice(0, 1);
				}
			}
		}

		return null;
	}
};

const ManagerBuildInstance = new ManagerBuild();
module.exports = ManagerBuildInstance;