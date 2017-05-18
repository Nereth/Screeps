"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
class Jurisdiction extends Memory_Accessor_1.MemoryAccessor {
    constructor(memory, roomId) {
        super(memory);
        this._crews = new Map();
        this._room = Game.rooms[roomId];
    }
    get Room() { return this._room; }
    get Crews() { return this._crews; }
    PreUpdate() {
    }
    Update() {
    }
    PostUpdate() {
    }
}
exports.Jurisdiction = Jurisdiction;
