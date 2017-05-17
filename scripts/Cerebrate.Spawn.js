"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cerebrate_1 = require("./Cerebrate");
class CerebrateSpawn extends Cerebrate_1.Cerebrate {
    get Requests() { return this.Memory.requests; }
    set Requests(requests) { this.Memory.requests = requests; }
    get Reserves() { return this.Memory.reserves; }
    set Reserves(reserves) { this.Memory.reserves = reserves; }
    constructor(memory) {
        super(memory);
        if (CerebrateSpawn.Instance == null) {
            CerebrateSpawn.Instance = this;
        }
        if (this.Memory.requests == null) {
            this.Memory.requests = [];
        }
        if (this.Memory.reserves == null) {
            this.Memory.reserves = [];
        }
    }
    HiveAdded(roomId) {
        super.HiveAdded(roomId);
    }
    HiveRemoved(roomId) {
        super.HiveRemoved(roomId);
    }
    PreUpdate() {
        this.HandleRequests();
    }
    Update() {
        console.log('Cerebrate Spawn Update');
    }
    PostUpdate() {
    }
    RequestUnit(role, priority) {
        let request = { name: null, role: role, priority: priority };
        if (this.Reserves.length != 0) {
            for (let i in this.Reserves) {
                let reserve = this.Reserves[i];
                if (request.role == reserve.role && request.priority == reserve.priority) {
                    return this.Reserves.splice(i, 1)[0].name;
                }
            }
        }
        else if (this.Requests.length == 0) {
            this.Requests.push(request);
        }
        else {
            for (let i in this.Requests) {
                if (this.Requests[i].priority < request.priority) {
                    this.Requests.splice(i, 0, request);
                    break;
                }
            }
        }
    }
    HandleRequests() {
        for (let name in Game.spawns) {
            for (let i in this.Requests) {
                let spawn = Game.spawns[name];
                let request = this.Requests[i];
                let role = request.role;
                if (spawn.canCreateCreep(role.Level[0]) == OK) {
                    let name = spawn.createCreep(role.Level[0], null, { role: request.role });
                    if (name != null) {
                        request.name = name;
                        this.Reserves.push(request);
                        this.Requests.splice(i, 1);
                        break;
                    }
                }
            }
        }
        this.Requests = [];
    }
}
exports.CerebrateSpawn = CerebrateSpawn;
