
export class MemoryAccessor {

    // Variables
    private _memory: Object;

    get Memory():any { return this._memory; }

    constructor(memory: Object) {

        this._memory = memory;
    }
}