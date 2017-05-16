"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
class UnitMiner extends Unit_1.Unit {
    get State() { return this.memory.state; }
    set State(state) { this.memory.state = state; }
    constructor(id) {
        super(id);
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
