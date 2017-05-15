var Swarm;
(function (Swarm) {
    class Memory {
        constructor(memory, schema) {
            this._memory = memory;
            console.log(Object.keys(schema).length);
            Object.keys(memory).forEach(key => {
                if (!schema.hasOwnProperty(key)) {
                    delete Object(memory)[key];
                }
            });
            Object.keys(schema).forEach(key => {
                if (!memory.hasOwnProperty(key)) {
                    Object(memory)[key] = Object(schema)[key];
                }
            });
        }
        get Memory() { return this._memory; }
    }
    Swarm.Memory = Memory;
})(Swarm || (Swarm = {}));
