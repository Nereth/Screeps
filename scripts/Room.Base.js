const BaseSpawn = require('./Spawn.Base');
const CrewHarvest= require('./Crew.Harvest');
const CrewInfastructure = require('./Crew.Infastructure');
const Role = { Crew: require('./Role.Crew') };

class RoomBase extends Room {

	/**
	* @param {string} room
	*/
	constructor(room) {
		Object.assign(Room);
		super(room);

		this.crews = [];

		// Prepare room memory.
		if(Memory.rooms == null) { Memory.rooms = {}; }
		if(Memory.rooms[room] == null) { Memory.rooms[room] = {}; }
		if(Memory.rooms[room].sources == null) { Memory.rooms[room].sources = []; }
		if(Memory.rooms[room].crews == null) { Memory.rooms[room].crews = {}; }

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
		if (crewsMem[Role.Crew.Harvest.Id] == null) {
			crewsMem[Role.Crew.Harvest.Id] = [];
		}

		let harvestCrewsMem = crewsMem[Role.Crew.Harvest.Id];

		if (harvestCrewsMem.length == 0) {
			sourcesMem.forEach(source => {
				harvestCrewsMem.push(null);
				let crew = new CrewHarvest(room, Role.Crew.Harvest.Id, harvestCrewsMem.length - 1);
				crew.source = source;
				crew.depot = Game.spawns['Spawn1'].id;
				this.crews.push(crew);
			});
		}
		else {
			for (let crew in harvestCrewsMem) {
				this.crews.push(new CrewHarvest(room, Role.Crew.Harvest.Id, crew));
			}
		}

		// Prepare infastructure crews.
		if (crewsMem[Role.Crew.Infastructure.Id] == null) {
			crewsMem[Role.Crew.Infastructure.Id] = [];
		}

		let infastructureCrewMem = crewsMem[Role.Crew.Infastructure.Id];

		if (infastructureCrewMem.length == 0) {
			for (let i = 0; i < 2; ++i) {
				infastructureCrewMem.push(null);
				let crew = new CrewInfastructure(room, Role.Crew.Infastructure.Id, infastructureCrewMem.length - 1);
				this.crews.push(crew);
			}
		}
		else {
			for (let crew in infastructureCrewMem) {
				this.crews.push(new CrewInfastructure(room, Role.Crew.Infastructure.Id, crew));
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