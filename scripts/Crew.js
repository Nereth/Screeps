"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
const Unit_1 = require("./Unit");
class Crew extends Memory_Accessor_1.MemoryAccessor {
    get ZergSpawning() { return this.Memory.zerg.spawning; }
    constructor(memory) {
        super(memory);
        if (this.Memory.zerg == null) {
            this.Memory.zerg = {};
        }
        Unit_1.Unit.
        ;
    }
}
exports.Crew = Crew;
