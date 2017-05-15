"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
class Hive extends Memory_Accessor_1.MemoryAccessor {
    get Room() { return this._room; }
    constructor(memory, roomId) {
        super(memory);
        this._room = Game.rooms[roomId];
    }
    PreUpdate() {
    }
    Update() {
    }
    PostUpdate() {
    }
}
exports.Hive = Hive;
