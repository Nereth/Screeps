import {Overmind} from './Overmind'

console.log('REFRESH');

// Initialize Overmind memory.
if(Memory.overmind == null) { Memory.overmind = {}; }

// Create Overmind instance.
const OvermindInstance = new Overmind(Memory.overmind);

function update() {
    OvermindInstance.Update();
}

// Setup main loop.
export const loop = update;