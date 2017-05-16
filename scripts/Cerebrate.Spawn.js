"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cerebrate_Base_1 = require("./Cerebrate.Base");
class CerebrateSpawn extends Cerebrate_Base_1.Cerebrate {
    constructor(memory) {
        super(memory);
    }
    HiveAdded(roomId) {
        super.HiveAdded(roomId);
    }
    HiveRemoved(roomId) {
        super.HiveRemoved(roomId);
    }
    PreUpdate() {
    }
    Update() {
        console.log('Cerebrate Spawn Update');
    }
    PostUpdate() {
    }
}
exports.CerebrateSpawn = CerebrateSpawn;
