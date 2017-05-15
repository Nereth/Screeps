"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
const Cerebrate_Spawn_1 = require("./Cerebrate.Spawn");
class Overmind extends Memory_Accessor_1.MemoryAccessor {
    constructor(memory) {
        super(memory);
        this._cerebrates = new Array();
        console.log('Creating Cerebrates');
        if (this.Memory.hives == null) {
            this.Memory.hives = Array();
        }
        if (this.Memory.cerebrates == null) {
            this.Memory.cerebrates = {};
        }
        if (this.Memory.cerebrates.spawn == null) {
            this.Memory.cerebrates.spawn = {};
        }
        this.Cerebretes.push(new Cerebrate_Spawn_1.CerebrateSpawn(this.Memory.cerebrates.spawn));
    }
    get Hives() { return this.Memory.hives; }
    get Cerebretes() { return this._cerebrates; }
    Update() {
        console.log("FOR THE SWARM!");
        this.CheckHives();
        this.Cerebretes.forEach(cerebrate => {
            cerebrate.PreUpdate();
        });
        this.Cerebretes.forEach(cerebrate => {
            cerebrate.Update();
        });
        this.Cerebretes.forEach(cerebrate => {
            cerebrate.PostUpdate();
        });
    }
    CheckHives() {
        Object.keys(Game.rooms).forEach(name => {
            if (this.Hives.includes(name) == false) {
                let controller = Game.rooms[name].controller;
                if (controller != null && controller.my == true) {
                    this.Hives.push(name);
                    this.Cerebretes.forEach(cerebrate => {
                        cerebrate.HiveAdded(name);
                    });
                    console.log('A New Hive Is Born!', name);
                }
            }
        });
        this.Hives.forEach(name => {
            if (Object.keys(Game.rooms).includes(name) == true) {
                let controller = Game.rooms[name].controller;
                if (controller.my == false) {
                    this.Cerebretes.forEach(cerebrate => {
                        cerebrate.HiveRemoved(name);
                    });
                    this.Hives.splice(this.Hives.indexOf(name), 1);
                    console.log('A Hive Has Been Lost!', name);
                }
            }
            else {
                this.Cerebretes.forEach(cerebrate => {
                    cerebrate.HiveRemoved(name);
                });
                this.Hives.splice(this.Hives.indexOf(name), 1);
                console.log('A Hive Has Been Lost!', name);
            }
        });
    }
}
exports.Overmind = Overmind;
