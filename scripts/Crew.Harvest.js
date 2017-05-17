"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crew_1 = require("./Crew");
const Role_1 = require("./Role");
const Unit_Miner_1 = require("./Unit.Miner");
const Unit_Courier_1 = require("./Unit.Courier");
const Unit_Storage_1 = require("./Unit.Storage");
const Cerebrate_Spawn_1 = require("./Cerebrate.Spawn");
class CrewHarvest extends Crew_1.Crew {
    get State() { return this.Memory.state; }
    set State(state) { this.Memory.state = state; }
    get Source() { return this.Memory.source; }
    set Source(id) { this.Memory.source = id; }
    get Depot() { return this.Memory.depot; }
    set Depot(id) { this.Memory.depot = id; }
    get UpdatingPath() { return this.Memory.updatingPath; }
    set UpdatingPath(value) { this.Memory.updatingPath = value; }
    get UpdatingOrders() { return this.Memory.updatingOrders; }
    set UpdatingOrders(value) { this.Memory.updatingOrders = value; }
    constructor(memory) {
        super(memory);
        this.UnitsActive.forEach(name => {
            let creep = Game.creeps[name];
            switch (creep.memory.role) {
                case Role_1.Role.Unit.Miner:
                    this._miners.push(new Unit_Miner_1.UnitMiner(creep.id));
                    break;
                case Role_1.Role.Unit.Storage:
                    this._storage.push(new Unit_Storage_1.UnitStorage(creep.id));
                    break;
                case Role_1.Role.Unit.Courier:
                    this._couriers.push(new Unit_Courier_1.UnitCourier(creep.id));
                    break;
            }
        });
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Miner] == null) {
            this.UnitsCountCurrent[Role_1.Role.Unit.Miner] = 0;
        }
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Storage] == null) {
            this.UnitsCountCurrent[Role_1.Role.Unit.Storage] = 0;
        }
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Courier] == null) {
            this.UnitsCountCurrent[Role_1.Role.Unit.Courier] = 0;
        }
        if (this.UnitsCountMax[Role_1.Role.Unit.Miner] == null) {
            this.UnitsCountMax[Role_1.Role.Unit.Miner] = 1;
        }
        if (this.UnitsCountMax[Role_1.Role.Unit.Storage] == null) {
            this.UnitsCountMax[Role_1.Role.Unit.Storage] = 1;
        }
        if (this.UnitsCountMax[Role_1.Role.Unit.Courier] == null) {
            this.UnitsCountMax[Role_1.Role.Unit.Courier] = 1;
        }
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
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Miner] < this.UnitsCountMax[Role_1.Role.Unit.Miner]) {
            this.AddUnit(Cerebrate_Spawn_1.CerebrateSpawn.Instance.RequestUnit(Role_1.Role.Unit.Miner, 10));
        }
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Storage] < this.UnitsCountMax[Role_1.Role.Unit.Storage]) {
            this.AddUnit(Cerebrate_Spawn_1.CerebrateSpawn.Instance.RequestUnit(Role_1.Role.Unit.Storage, 10));
        }
        if (this.UnitsCountCurrent[Role_1.Role.Unit.Courier] < this.UnitsCountMax[Role_1.Role.Unit.Courier]) {
            this.AddUnit(Cerebrate_Spawn_1.CerebrateSpawn.Instance.RequestUnit(Role_1.Role.Unit.Courier, 10));
        }
    }
    UpdateState() {
        switch (this.State) {
            case CrewHarvest.State.Partial:
                {
                    if (this._miners.length > 0 && this._storage.length > 0 && this._couriers.length > 0) {
                        this.State = CrewHarvest.State.Full;
                        this.UpdatingOrders = true;
                    }
                }
                break;
            case CrewHarvest.State.Full:
                {
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
                let source = Game.getObjectById(this.Source);
                let depot = Game.getObjectById(this.Depot);
                let spaces = 0;
                for (let i = -1; i <= 1; ++i) {
                    for (let j = -1; j <= 1; ++j) {
                        let checkPos = new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName);
                        checkPos.x += i;
                        checkPos.y += j;
                        let result = checkPos.lookFor(LOOK_TERRAIN);
                        if (result.length && result[0] != 'wall')
                            ++spaces;
                    }
                }
                this.UnitsCountMax[Role_1.Role.Unit.Miner] = spaces;
                let path = PathFinder.search(source.pos, depot.pos).path;
                this.UnitsCountMax[Role_1.Role.Unit.Courier] = Math.round(path.length / 8 - 1);
                if (this.UnitsCountMax[Role_1.Role.Unit.Courier] <= 0)
                    this.UnitsCountMax[Role_1.Role.Unit.Courier] = 1;
                this.UpdatingOrders = true;
            }
        }
        this.UpdatingPath = false;
    }
    UpdateOrders() {
        if (this.UpdatingOrders == true) {
            switch (this.State) {
                case CrewHarvest.State.Partial:
                case CrewHarvest.State.Full:
                    {
                        this._miners.forEach(miner => {
                            miner.TakeFrom = this.Source;
                            miner.TakeTo = this.Depot;
                        });
                    }
                    break;
            }
        }
        this.UpdatingOrders = false;
    }
    CreepActivated(unitName) {
        this.UpdatingOrders = true;
    }
}
exports.CrewHarvest = CrewHarvest;
(function (CrewHarvest) {
    var State;
    (function (State) {
        State[State["Partial"] = 0] = "Partial";
        State[State["Full"] = 1] = "Full";
    })(State = CrewHarvest.State || (CrewHarvest.State = {}));
})(CrewHarvest = exports.CrewHarvest || (exports.CrewHarvest = {}));
