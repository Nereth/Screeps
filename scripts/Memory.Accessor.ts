
export class MemoryAccessor {

    // Variables
    protected _memory: Object;

    get Memory():any { return this._memory; }

    constructor(memory: Object) {

        this._memory = memory;
    }
}