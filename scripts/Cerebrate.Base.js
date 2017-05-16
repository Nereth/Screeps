"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
const Hive_1 = require("./Hive");
class Cerebrate extends Memory_Accessor_1.MemoryAccessor {
    constructor(memory) {
        super(memory);
        this._hives = new Array();
        if (this.Memory.hives == null) {
            this.Memory.hives = {};
        }
        for (let roomId in this.Memory.hives) {
            this.Hive.push({ id: roomId, hive: new Hive_1.Hive(this.Memory.hives[this.Memory.hives.length - 1], roomId) });
        }
    }
    get Hive() { return this._hives; }
    HiveAdded(roomId) {
        let addHive = true;
        for (let index in this.Hive) {
            if (this.Hive[index].id == roomId) {
                addHive = false;
                break;
            }
        }
        if (addHive == true) {
            this.Memory.hives[roomId] = {};
            this.Hive.push({ id: roomId, hive: new Hive_1.Hive(this.Memory.hives[this.Memory.hives.length - 1], roomId) });
        }
    }
    HiveRemoved(roomId) {
        this.Hive.forEach(hive => {
            if (hive.id == roomId) {
                delete this.Memory.hives[roomId];
                this.Hive.splice(this.Hive.indexOf(hive));
            }
        });
    }
    PreUpdate() {
        this.Hive.forEach(hive => {
            hive.hive.PreUpdate();
        });
    }
    Update() {
        this.Hive.forEach(hive => {
            hive.hive.Update();
        });
    }
    PostUpdate() {
        this.Hive.forEach(hive => {
            hive.hive.PostUpdate();
        });
    }
}
exports.Cerebrate = Cerebrate;
