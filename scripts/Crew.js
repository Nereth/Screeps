"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
class Crew extends Memory_Accessor_1.MemoryAccessor {
    constructor(memory) {
        super(memory);
        this._units = new Array();
        if (this.Memory.units == null) {
            this.Memory.units = {};
        }
        if (this.Memory.units.spawning == null) {
            this.Memory.units.spawning = [];
        }
        if (this.Memory.units.active == null) {
            this.Memory.units.active = [];
        }
        if (this.Memory.units.count.current == null) {
            this.Memory.units.count.current = {};
        }
        if (this.Memory.units.count.max == null) {
            this.Memory.units.count.max = {};
        }
        this.UpdateSpawningUnits();
    }
    get Role() { return this.Memory.role; }
    set Role(role) { this.Memory.role = role; }
    get UnitsSpawning() { return this.Memory.units.spawning; }
    get UnitsActive() { return this.Memory.units.active; }
    get UnitsCountCurrent() { return this.Memory.count.current; }
    get UnitsCountMax() { return this.Memory.count.max; }
    Update() {
    }
    UpdateSpawningUnits() {
        this.UnitsSpawning.forEach(name => {
            if (Game.creeps[name] == null) {
                this.UnitsSpawning.splice(this.UnitsSpawning.indexOf(name), 1);
                if (this.UnitsCountCurrent[Memory.creeps[name].Role] > 0)
                    this.UnitsCountCurrent[Memory.creeps[name].Role]--;
                delete Memory.creeps[name];
            }
            else {
                let creep = Game.creeps[name];
                if (creep.id != null && creep.spawning == false) {
                    this.UnitsActive.push(name);
                    this.UnitsSpawning.splice(this.UnitsSpawning.indexOf(name), 1);
                    this.CreepActivated(name);
                }
            }
        });
        this.UnitsActive.forEach(name => {
            let creep = Game.creeps[name];
            if (creep == null) {
                this.UnitsActive.splice(this.UnitsActive.indexOf(name), 1);
                if (this.UnitsCountCurrent[Memory.creeps[name].role] > 0)
                    this.UnitsCountCurrent[Memory.creeps[name].role]--;
                delete Memory.creeps[name];
            }
        });
    }
    AddUnit(unitName) {
        if (unitName == null || Game.creeps[unitName] == null)
            return;
        if (Game.creeps[unitName].spawning)
            this.UnitsSpawning.push(unitName);
        else
            this.UnitsActive.push(unitName);
        let creepRole = Game.creeps[unitName].memory.role;
        if (this.UnitsCountCurrent[creepRole] == null) {
            this.UnitsCountCurrent[creepRole] = 1;
        }
        else {
            this.UnitsCountCurrent[creepRole]++;
        }
    }
    CreepActivated(unitName) {
    }
}
exports.Crew = Crew;
