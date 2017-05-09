const BaseSpawn = require('./Spawn.Base');
const CrewHarvest= require('./Crew.Harvest');
const CrewInfastructure = require('./Crew.Infastructure');
const Type = { Crew: require('./Type.Crew') };

class RoomBase extends Room {

	/**
	* @param {string} room
	*/
	constructor(room) {
		Object.assign(Room);
		super(room);

		this.crews = [];

		// Prepare room memory.
		if (Memory.rooms[room] == null) {
			Memory.rooms[room] = { sources: [], crews: {} };
		}

		let sourcesMem = Memory.rooms[room].sources;
		let crewsMem = Memory.rooms[room].crews;

		// Cache sources.
		if (sourcesMem.length == 0) {
			let sources = Game.rooms[room].find(FIND_SOURCES);
			sources.forEach(source => {
				sourcesMem.push(source.id);
			});
		}

		// Prepare harvester crews.
		if (crewsMem[Type.Crew.Harvest.Id] == null) {
			crewsMem[Type.Crew.Harvest.Id] = [];
		}

		let harvestCrewsMem = crewsMem[Type.Crew.Harvest.Id];

		if (harvestCrewsMem.length == 0) {
			sourcesMem.forEach(source => {
				harvestCrewsMem.push(null);
				let crew = new CrewHarvest(room, Type.Crew.Harvest.Id, harvestCrewsMem.length - 1);
				crew.source = source;
				crew.depot = Game.spawns['Spawn1'].id;
				this.crews.push(crew);
			});
		}
		else {
			for (let crew in harvestCrewsMem) {
				this.crews.push(new CrewHarvest(room, Type.Crew.Harvest.Id, crew));
			}
		}

		// Prepare infastructure crews.
		if (crewsMem[Type.Crew.Infastructure.Id] == null) {
			crewsMem[Type.Crew.Infastructure.Id] = [];
		}

		let infastructureCrewMem = crewsMem[Type.Crew.Infastructure.Id];

		if (infastructureCrewMem.length == 0) {
			for (let i = 0; i < 2; ++i) {
				infastructureCrewMem.push(null);
				let crew = new CrewHarvest(room, Type.Crew.Infastructure.Id, infastructureCrewMem.length - 1);
				this.crews.push(crew);
			}
		}
		else {
			for (let crew in infastructureCrewMem) {
				this.crews.push(new CrewInfastructure(room, Type.Crew.Infastructure.Id, crew));
			}
		}
	}

	Update() {
		// Update crews.
		this.crews.forEach(crew => {
			crew.Update();
		});
	}
};

module.exports = RoomBase;