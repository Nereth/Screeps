"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("./Role");
class Unit extends Creep {
    get Memory() { return this.memory; }
    set Memory(memory) { this.memory = memory; }
    get Role() { return this.memory.role; }
    set Role(role) { this.memory.role = role; }
    constructor(id) {
        super(id);
        this.Role = Role_1.Role.Unit.Unknown;
    }
    Update() {
    }
}
exports.Unit = Unit;
