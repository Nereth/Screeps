"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryAccessor {
    get Memory() { return this._memory; }
    constructor(memory) {
        this._memory = memory;
    }
}
exports.MemoryAccessor = MemoryAccessor;
