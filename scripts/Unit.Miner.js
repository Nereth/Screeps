"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Role_1 = require("./Role");
class UnitMiner extends Unit_1.Unit {
    get State() { return this.Memory.state; }
    set State(state) { this.Memory.state = state; }
    get TakeFrom() { return this.Memory.takeFrom; }
    set TakeFrom(takeFrom) { this.Memory.takeFrom = takeFrom; }
    get TakeTo() { return this.Memory.takeTo; }
    set TakeTo(takeTo) { this.Memory.takeTo = takeTo; }
    constructor(id) {
        super(id);
        this.Role = Role_1.Role.Unit.Miner;
    }
    Update() {
    }
}
exports.UnitMiner = UnitMiner;
(function (UnitMiner) {
    var State;
    (function (State) {
        State[State["Idle"] = 0] = "Idle";
        State[State["Mine"] = 1] = "Mine";
        State[State["Return"] = 2] = "Return";
    })(State = UnitMiner.State || (UnitMiner.State = {}));
    UnitMiner.Level = [
        [WORK, CARRY, MOVE],
    ];
})(UnitMiner = exports.UnitMiner || (exports.UnitMiner = {}));
