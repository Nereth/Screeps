"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Role_1 = require("./Role");
class UnitStorage extends Unit_1.Unit {
    get State() { return this.Memory.state; }
    set State(state) { this.Memory.state = state; }
    constructor(id) {
        super(id);
        this.Role = Role_1.Role.Unit.Storage;
    }
    Update() {
    }
}
exports.UnitStorage = UnitStorage;
(function (UnitStorage) {
    var State;
    (function (State) {
        State[State["Idle"] = 0] = "Idle";
        State[State["Move"] = 1] = "Move";
        State[State["Distribution"] = 2] = "Distribution";
    })(State = UnitStorage.State || (UnitStorage.State = {}));
    UnitStorage.Level = [
        [CARRY, CARRY, CARRY, CARRY, MOVE],
    ];
})(UnitStorage = exports.UnitStorage || (exports.UnitStorage = {}));
