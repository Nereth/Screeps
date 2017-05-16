"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unit extends Creep {
    get Role() { return this.memory.role; }
    set Role(role) { this.memory.role = role; }
    constructor(id) {
        super(id);
        this.memory.role = Unit.Role.Unknown;
    }
    Update() {
    }
}
exports.Unit = Unit;
(function (Unit) {
    var Role;
    (function (Role) {
        Role[Role["Unknown"] = 0] = "Unknown";
        Role[Role["Miner"] = 1] = "Miner";
    })(Role = Unit.Role || (Unit.Role = {}));
})(Unit = exports.Unit || (exports.Unit = {}));
