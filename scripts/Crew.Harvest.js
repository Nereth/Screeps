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
	set source(id) { this.memory.source = id; }

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
	}

	Update() {

		this.UpdateCreepRequests();

		this.UpdateState();

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
		if (this.miners.length < 1) {
			Factory.Creep.RequestCreep(this, Type.Creep.Miner.Id, 10);
		}

		if (this.storage.length < 1) {
			Factory.Creep.RequestCreep(this, Type.Creep.Storage.Id, 10);
		}

		if (this.couriers.length < 2) {
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

	UpdateOrders() {
		if (this.updateOrders == true) {
			console.log('Updating Orders:', this.state);
			switch (this.state) {
				case CrewHarvest.State.Partial: {
					this.miners.forEach(miner => {
						miner.TakeFrom = this.source;
						miner.TakeTo = Game.spawns['Spawn1'].id;
					});

				}
					break;

				case CrewHarvest.State.Full: {
					this.miners.forEach(miner => {
						miner.TakeFrom = this.source;
						miner.TakeTo = this.storage[0].id;
					});

					this.couriers.forEach(courier => {
						this.storage[0].Accessors.push(courier.id);
						courier.TakeFrom = this.storage[0].id;
						courier.TakeTo = Game.spawns['Spawn1'].id;
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