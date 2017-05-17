import {Crew} from './Crew'
import {Role} from './Role'
import {Unit} from './Unit'
import {UnitMiner} from './Unit.Miner'
import {UnitCourier} from './Unit.Courier'
import {UnitStorage} from './Unit.Storage'
import {CerebrateSpawn} from './Cerebrate.Spawn'

export class CrewHarvest extends Crew {
	
	// Variables
	private _miners:Array<UnitMiner>;

	private _storage:Array<UnitStorage>;

	private _couriers:Array<UnitCourier>;

    // Functions
	get State(): CrewHarvest.State { return this.Memory.state; }
	set State(state: CrewHarvest.State) { this.Memory.state = state; }

	get Source():string { return this.Memory.source; }
	set Source(id:string) { this.Memory.source = id; }

	get Depot():string { return this.Memory.depot; }
	set Depot(id:string) { this.Memory.depot = id; }

	get UpdatingPath() { return this.Memory.updatingPath; }
	set UpdatingPath(value) { this.Memory.updatingPath = value; }

	get UpdatingOrders() { return this.Memory.updatingOrders; }
	set UpdatingOrders(value) { this.Memory.updatingOrders = value; }

	constructor(memory: Object) {
		super(memory);

		this.UnitsActive.forEach(name => {
			let creep = Game.creeps[name];

			switch(creep.memory.role) {
				case Role.Unit.Miner:
					this._miners.push(new UnitMiner(creep.id));
					break;

				case Role.Unit.Storage:
					this._storage.push(new UnitStorage(creep.id));
					break;
				
				case Role.Unit.Courier:
					this._couriers.push(new UnitCourier(creep.id));
					break;
			}
		});

		// Initialize creep counts.
		if(this.UnitsCountCurrent[Role.Unit.Miner] == null) 	{ this.UnitsCountCurrent[Role.Unit.Miner] = 0; }
		if(this.UnitsCountCurrent[Role.Unit.Storage] == null)	{ this.UnitsCountCurrent[Role.Unit.Storage] = 0; }
		if(this.UnitsCountCurrent[Role.Unit.Courier] == null) 	{ this.UnitsCountCurrent[Role.Unit.Courier] = 0; }

		// Initialize max creep counts.
		if(this.UnitsCountMax[Role.Unit.Miner] == null) 	{ this.UnitsCountMax[Role.Unit.Miner] = 1; }
		if(this.UnitsCountMax[Role.Unit.Storage] == null)	{ this.UnitsCountMax[Role.Unit.Storage] = 1; }
		if(this.UnitsCountMax[Role.Unit.Courier] == null) 	{ this.UnitsCountMax[Role.Unit.Courier] = 1; }

		if (this.UpdatingOrders == null)
			this.UpdatingOrders = false;

		if (this.UpdatingPath == null)
			this.UpdatingPath = false;
	}

	Update() {

		this.UpdateCreepRequests();

		this.UpdateState();

		this.UpdatePath();

		this.UpdateOrders();

		this._miners.forEach(unit => {
			unit.Update();
		});

		this._storage.forEach(unit => {
			unit.Update();
		});

		this._couriers.forEach(unit => {
			unit.Update();
		});
	}

	UpdateCreepRequests() {
		if (this.UnitsCountCurrent[Role.Unit.Miner] < this.UnitsCountMax[Role.Unit.Miner]) {
			this.AddUnit(CerebrateSpawn.Instance.RequestUnit(Role.Unit.Miner, 10));
		}

		if (this.UnitsCountCurrent[Role.Unit.Storage] < this.UnitsCountMax[Role.Unit.Storage]) {
			this.AddUnit(CerebrateSpawn.Instance.RequestUnit(Role.Unit.Storage, 10));
		}

		if (this.UnitsCountCurrent[Role.Unit.Courier] < this.UnitsCountMax[Role.Unit.Courier]) {
			this.AddUnit(CerebrateSpawn.Instance.RequestUnit(Role.Unit.Courier, 10));
		}
	}

	UpdateState() {

		switch (this.State) {
			case CrewHarvest.State.Partial: {
				if (this._miners.length > 0 && this._storage.length > 0 && this._couriers.length > 0) {
					this.State = CrewHarvest.State.Full;
					this.UpdatingOrders = true;
				}
			}
				break;

			case CrewHarvest.State.Full: {
				if (this._miners.length == 0 || this._storage.length == 0 || this._couriers.length == 0) {
					this.State = CrewHarvest.State.Partial;
					this.UpdatingOrders = true;
				}
			}
				break;
		}
	}

	UpdatePath() {
		if (this.UpdatingPath == true) {
			if (this.Source != null && this.Depot != null) {
				let source:any = Game.getObjectById(this.Source);
				let depot:any = Game.getObjectById(this.Depot);

				// Check for unblocked spaces around source.
				let spaces = 0;
				for(let i = -1; i <= 1; ++i) {
					for(let j = -1; j <= 1; ++j) {
						let checkPos = new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName);
						checkPos.x += i;
						checkPos.y += j;

						let result = checkPos.lookFor(LOOK_TERRAIN);
						
						if(result.length && result[0] != 'wall')
							++spaces;
					}
				}

				this.UnitsCountMax[Role.Unit.Miner] = spaces;

				let path = PathFinder.search(source.pos, depot.pos).path;

				//path.forEach(pos => {
				//	//console.log('Request Construct:', STRUCTURE_ROAD, pos);
				//	Manager.Build.RequestConstruction(STRUCTURE_ROAD, pos);
				//});

				this.UnitsCountMax[Role.Unit.Courier] = Math.round(path.length / 8 - 1);

				if (this.UnitsCountMax[Role.Unit.Courier] <= 0)
					this.UnitsCountMax[Role.Unit.Courier] = 1;

				this.UpdatingOrders = true;
			}
		}

		this.UpdatingPath = false;
	}

	UpdateOrders() {
		if (this.UpdatingOrders == true) {
			switch (this.State) {
				case CrewHarvest.State.Partial:
				case CrewHarvest.State.Full: {
					this._miners.forEach(miner => {
						miner.TakeFrom = this.Source;
						miner.TakeTo = this.Depot;
					});

				}
					break;
				/*
				case CrewHarvest.State.Full: {
					this._miners.forEach(miner => {
						miner.TakeFrom = this.Source;
						miner.TakeTo = this.storage[0].id;
					});

					this._storage.forEach(storage => {
						storage.Accessors = [];
						this.couriers.forEach(courier => {
							storage.Accessors.push(courier.id);
							courier.TakeFrom = storage.id;
							courier.TakeTo = this.depot;
						});
					});
				}
					break;
			*/
			}
		}

		this.UpdatingOrders = false;
	}

	CreepActivated(unitName:string) {
		/*
		let creep:Creep = Game.creeps[unitName];

		switch (creep.memory.role) {
			case Role.Unit.Storage: {
				let source:any = Game.getObjectById(this.Source);
				let path = PathFinder.search(source.pos, Game.spawns['Spawn1'].pos, 1).path;

				if (path.length > 1)
					creep.Location = path[1];
				else if (path.length == 1)
					creep.Location = path[0];
				else
					creep.Location = creep.pos;
			}
		}
		*/

		this.UpdatingOrders = true;
	}
}

export module CrewHarvest {
	export enum State {
		Partial,
		Full,
	}
}

/*
const CrewBase = require('./Crew.Base');
const Role = { Creep: require('./Role.Creep') }
const Manager = require('./Manager');

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


	constructor(room, role, id) {
		super(room, role, id);

		// Prep miner list alias
		if (this.creeps[Role.Creep.Miner.Id] == null)
			this.creeps[Role.Creep.Miner.Id] = [];

		this.miners = this.creeps[Role.Creep.Miner.Id];

		// Prep courier list alias
		if (this.creeps[Role.Creep.Storage.Id] == null)
			this.creeps[Role.Creep.Storage.Id] = [];

		this.storage = this.creeps[Role.Creep.Storage.Id];

		// Prep courier list alias
		if (this.creeps[Role.Creep.Courier.Id] == null)
			this.creeps[Role.Creep.Courier.Id] = [];

		this.couriers = this.creeps[Role.Creep.Courier.Id];

		// Initialize creep counts.
		if(this.creepsCountCurrent[Role.Creep.Miner.Id] == null) 	{ this.creepsCountCurrent[Role.Creep.Miner.Id] = 0; }
		if(this.creepsCountCurrent[Role.Creep.Storage.Id] == null)	{ this.creepsCountCurrent[Role.Creep.Storage.Id] = 0; }
		if(this.creepsCountCurrent[Role.Creep.Courier.Id] == null) 	{ this.creepsCountCurrent[Role.Creep.Courier.Id] = 0; }

		// Initialize max creep counts.
		if(this.creepsCountMax[Role.Creep.Miner.Id] == null) 	{ this.creepsCountMax[Role.Creep.Miner.Id] = 1; }
		if(this.creepsCountMax[Role.Creep.Storage.Id] == null) 	{ this.creepsCountMax[Role.Creep.Storage.Id] = 1; }
		if(this.creepsCountMax[Role.Creep.Courier.Id] == null) 	{ this.creepsCountMax[Role.Creep.Courier.Id] = 1; }

		if (this.updateOrders == null)
			this.updateOrders = false;

		if (this.updatePath == null)
			this.updatePath = false;
	}

	Update() {

		this.UpdateCreepRequests();

		this.UpdateState();

		this.UpdatePath();

		this.UpdateOrders();

		Object.keys(this.creeps).forEach(role => {
			this.creeps[role].forEach(creep => {
				if (creep.spawning == false) {
					creep.Update();
				}
			});
		});
	}

	UpdateCreepRequests() {
		if (this.creepsCountCurrent[Role.Creep.Miner.Id] < this.creepsCountMax[Role.Creep.Miner.Id]) {
			this.AddCreep(Manager.Spawn.RequestCreep(Role.Creep.Miner.Id, 10));
		}

		if (this.creepsCountCurrent[Role.Creep.Storage.Id] < this.creepsCountMax[Role.Creep.Storage.Id]) {
			this.AddCreep(Manager.Spawn.RequestCreep(Role.Creep.Storage.Id, 10));
		}

		if (this.creepsCountCurrent[Role.Creep.Courier.Id] < this.creepsCountMax[Role.Creep.Courier.Id]) {
			this.AddCreep(Manager.Spawn.RequestCreep(Role.Creep.Courier.Id, 10));
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

				// Check for unblocked spaces around source.
				let spaces = 0;
				for(let i = -1; i <= 1; ++i) {
					for(let j = -1; j <= 1; ++j) {
						let checkPos = new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName);
						checkPos.x += i;
						checkPos.y += j;

						let result = checkPos.lookFor(LOOK_TERRAIN);
						
						if(result.length && result[0] != 'wall')
							++spaces;
					}
				}

				this.creepsCountMax[Role.Creep.Miner.Id] = spaces;

				let path = PathFinder.search(source.pos, depot.pos).path;

				path.forEach(pos => {
					//console.log('Request Construct:', STRUCTURE_ROAD, pos);
					Manager.Build.RequestConstruction(STRUCTURE_ROAD, pos);
				});

				this.creepsCountMax[Role.Creep.Courier.Id] = Math.round(path.length / 8 - 1);

				if (this.creepsCountMax[Role.Creep.Courier.Id] <= 0)
					this.creepsCountMax[Role.Creep.Courier.Id] = 1;

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

	CreepActivated(creep) {

		//console.log('Activated', creep.Role);

		switch (creep.Role) {
			case Role.Creep.Storage.Id: {
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
*/