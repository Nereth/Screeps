const CrewBase = require('./Crew.Base');
const Factory = require('./Factory')
const Type = { Creep: require('./Type.Creep') }

class CrewHarvest extends CrewBase {

	static get State() {
		return {
			Partial: 0,
			Full: 1,
		};
	}

	get source() { return this.memory.source; }
	set source(id) { this.updatePath = true; this.memory.source = id; }

	get depot() { return this.memory.depot; }
	set depot(id) { this.updatePath = true; this.memory.depot = id; }

	get updatePath() { return this.memory.updatePath; }
	set updatePath(value) { this.memory.updatePath = value; }

	get updateOrders() { return this.memory.updateOrders; }
	set updateOrders(value) { this.memory.updateOrders = value; }

	/**
	* @param {Room}		room
	* @param {string}	role
	* @param {number}	id
	*/
	constructor(room, role, id) {
		super(room, role, id);

		// Prep miner list alias
		if (this.creeps[Type.Creep.Miner.Id] == null)
			this.creeps[Type.Creep.Miner.Id] = [];

		this.miners = this.creeps[Type.Creep.Miner.Id];

		// Prep courier list alias
		if (this.creeps[Type.Creep.Storage.Id] == null)
			this.creeps[Type.Creep.Storage.Id] = [];

		this.storage = this.creeps[Type.Creep.Storage.Id];

		// Prep courier list alias
		if (this.creeps[Type.Creep.Courier.Id] == null)
			this.creeps[Type.Creep.Courier.Id] = [];

		this.couriers = this.creeps[Type.Creep.Courier.Id];

		if (this.updateOrders == null)
			this.updateOrders = false;

		if (this.updatePath == null)
			this.updatePath = false;

		if (this.memory.maxMiners == null)
			this.memory.maxMiners = 1;

		if (this.memory.maxStorage == null)
			this.memory.maxStorage = 1;

		if (this.memory.maxCouriers == null)
			this.memory.maxCouriers = 1;
	}

	Update() {

		this.UpdateCreepRequests();

		this.UpdateState();

		this.UpdatePath();

		this.UpdateOrders();

		Object.keys(this.creeps).forEach(type => {
			this.creeps[type].forEach(creep => {
				if (creep.spawning == false) {
					creep.Update();
				}
			});
		});
	}

	UpdateCreepRequests() {
		if (this.miners.length < this.memory.maxMiners) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner.Id, 10);
		}

		if (this.storage.length < this.memory.maxStorage) {
			Factory.Creep.RequestCreep(this, Type.Creep.Storage.Id, 10);
		}

		if (this.couriers.length < this.memory.maxCouriers) {
			Factory.Creep.RequestCreep(this, Type.Creep.Courier.Id, 10);
		}
	}

	UpdateState() {

		switch (this.state) {
			case CrewHarvest.State.Partial: {
				if (this.miners.length > 0 && this.storage.length > 0 && this.couriers.length > 0) {
					this.state = CrewHarvest.State.Full;
					this.updateOrders = true;
				}
			}
				break;

			case CrewHarvest.State.Full: {
				if (this.miners.length == 0 || this.storage.length == 0 || this.couriers.length == 0) {
					this.state = CrewHarvest.State.Partial;
					this.updateOrders = true;
				}
			}
				break;
		}
	}

	UpdatePath() {
		if (this.updatePath == true) {
			if (this.source != null && this.depot != null) {
				let source = Game.getObjectById(this.source);
				let depot = Game.getObjectById(this.depot);

				let path = PathFinder.search(source.pos, depot.pos).path;

				path.forEach(pos => {
					Game.rooms[this.room].createConstructionSite(pos, STRUCTURE_ROAD);
				});

				this.memory.maxCouriers = Math.round(path.length / 8 - 1);

				if (this.memory.maxCouriers == 0)
					this.memory.maxCouriers = 1;

				this.updateOrders = true;
			}
		}

		this.updatePath = false;
	}

	UpdateOrders() {
		if (this.updateOrders == true) {
			switch (this.state) {
				case CrewHarvest.State.Partial: {
					this.miners.forEach(miner => {
						miner.TakeFrom = this.source;
						miner.TakeTo = this.depot;
					});

				}
					break;

				case CrewHarvest.State.Full: {
					this.miners.forEach(miner => {
						miner.TakeFrom = this.source;
						miner.TakeTo = this.storage[0].id;
					});

					this.storage.forEach(storage => {
						storage.Accessors = [];
						this.couriers.forEach(courier => {
							storage.Accessors.push(courier.id);
							courier.TakeFrom = storage.id;
							courier.TakeTo = this.depot;
						});
					});
				}
					break;
			}
		}

		this.updateOrders = false;
	}

	/**
	* @param {Creep} creep
	*/
	CreepActivated(creep) {

		console.log('Activated', creep.Type);

		switch (creep.Type) {
			case Type.Creep.Storage.Id: {
				let source = Game.getObjectById(this.source);
				let path = PathFinder.search(source.pos, Game.spawns['Spawn1'].pos, 1).path;

				if (path.length > 1)
					creep.Location = path[1];
				else if (path.length == 1)
					creep.Location = path[0];
				else
					creep.Location = creep.pos;
			}
		}

		this.updateOrders = true;
	}

};

module.exports = CrewHarvest;