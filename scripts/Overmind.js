"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memory_Accessor_1 = require("./Memory.Accessor");
const Cerebrate_Spawn_1 = require("./Cerebrate.Spawn");
class Overmind extends Memory_Accessor_1.MemoryAccessor {
    constructor(memory) {
        super(memory);
        this._cerebrates = new Array();
        console.log('Creating Cerebrates');
        if (this.Memory.territories == null) {
            this.Memory.territories = Array();
        }
        if (this.Memory.cerebrates == null) {
            this.Memory.cerebrates = {};
        }
        if (this.Memory.cerebrates.spawn == null) {
            this.Memory.cerebrates.spawn = {};
        }
        this.Cerebretes.push(new Cerebrate_Spawn_1.CerebrateSpawn(this.Memory.cerebrates.spawn));
    }
    get Territories() { return this.Memory.territories; }
    get Cerebretes() { return this._cerebrates; }
    Update() {
        console.log("FOR THE SWARM!");
        this.CheckTerritories();
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
    CheckTerritories() {
        Object.keys(Game.rooms).forEach(name => {
            if (this.Territories.includes(name) == false) {
                let controller = Game.rooms[name].controller;
                if (controller != null && controller.my == true) {
                    this.Territories.push(name);
                    this.Cerebretes.forEach(cerebrate => {
                        cerebrate.RoomAdded(name);
                    });
                    console.log('A New Hive Is Born!', name);
                }
            }
        });
        this.Territories.forEach(name => {
            if (Object.keys(Game.rooms).includes(name) == true) {
                let controller = Game.rooms[name].controller;
                if (controller.my == false) {
                    this.Cerebretes.forEach(cerebrate => {
                        cerebrate.RoomRemoved(name);
                    });
                    this.Territories.splice(this.Territories.indexOf(name), 1);
                    console.log('A Hive Has Been Lost!', name);
                }
            }
            else {
                this.Cerebretes.forEach(cerebrate => {
                    cerebrate.RoomRemoved(name);
                });
                this.Territories.splice(this.Territories.indexOf(name), 1);
                console.log('A Hive Has Been Lost!', name);
            }
        });
    }
}
exports.Overmind = Overmind;
