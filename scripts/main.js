"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Overmind_1 = require("./Overmind");
console.log('REFRESH');
if (Memory.overmind == null) {
    Memory.overmind = {};
}
const OvermindInstance = new Overmind_1.Overmind(Memory.overmind);
function update() {
    OvermindInstance.Update();
}
exports.loop = update;
