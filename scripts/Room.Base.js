const BaseSpawn = require('./Spawn.Base');
const CrewHarvest = require('./Crew.Harvest');
const CrewInfastructure = require('./Crew.Infastructure');

class RoomBase extends Room {

	/**
	* @param {string} room
	*/
	constructor(room) {
		Object.assign(Room);
		super(room);

		// Prepare rooms memory
		if (Memory.rooms[room] == undefined) {
			Memory.rooms[room] = { sources: [], crews: {} };

			let roomMem = Memory.rooms[room];
			let sourcesMem = roomMem.sources;
			let crewsMem = roomMem.crews;

			// Find sources and prepare harvester crew memory.
			let sources = Game.rooms[room].find(FIND_SOURCES);

			crewsMem['harvesters'] = new Array();
			crewsMem['infastructure'] = new Array();

			sources.forEach(source => {
				sourcesMem.push(source.id);
				crewsMem['harvesters'].push({ source: source.id })
				crewsMem['infastructure'].push({});
			});
		}

		this.crews = { harvesters: new Array(), infastructure: new Array() };

		// Create a harvester crew for each source.
		if (Memory.rooms[room].crews.harvesters.length > 0) {
			Memory.rooms[room].crews.harvesters.forEach(crewMem => {
				this.crews.harvesters.push(new CrewHarvest(crewMem));
		});
		}

		// Create an infastructure crew for each source.
		if (Memory.rooms[room].crews.infastructure.length > 0) {
			Memory.rooms[room].crews.infastructure.forEach(crewMem => {
				this.crews.infastructure.push(new CrewInfastructure(crewMem));
			});
		}
	}

	Update() {
		// Update harvester crews.
		this.crews.harvesters.forEach(crew => {
			crew.Update();
		});

		// Update infastructure crews.
		this.crews.infastructure.forEach(crew => {
			crew.Update();
		});
	}
};

module.exports = RoomBase;