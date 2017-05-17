"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Role_1 = require("./Role");
class UnitCourier extends Unit_1.Unit {
    get State() { return this.Memory.state; }
    set State(state) { this.Memory.state = state; }
    constructor(id) {
        super(id);
        this.Role = Role_1.Role.Unit.Courier;
    }
    Update() {
    }
}
exports.UnitCourier = UnitCourier;
(function (UnitCourier) {
    var State;
    (function (State) {
        State[State["Idle"] = 0] = "Idle";
        State[State["Obtain"] = 1] = "Obtain";
        State[State["Return"] = 2] = "Return";
    })(State = UnitCourier.State || (UnitCourier.State = {}));
    UnitCourier.Level = [
        [CARRY, CARRY, MOVE, MOVE],
    ];
})(UnitCourier = exports.UnitCourier || (exports.UnitCourier = {}));
