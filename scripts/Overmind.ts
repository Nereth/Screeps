import { MemoryAccessor } from './Memory.Accessor'
import { Cerebrate } from './Cerebrate'
import { CerebrateSpawn } from './Cerebrate.Spawn'

export class Overmind extends MemoryAccessor {

    // Variables
    private _cerebrates: Array<Cerebrate> = new Array<Cerebrate>();

    get Territories(): Array<string> { return this.Memory.territories; }
    get Cerebretes(): Cerebrate[] { return this._cerebrates; }

    // Functions
    constructor(memory: Object) {
        super(memory);

        console.log('Creating Cerebrates');

        // Initialize Overlord memory.
        if(this.Memory.territories == null) { this.Memory.territories = Array<string>(); }

        // Initialize cerebrate memory.
        if(this.Memory.cerebrates == null) { this.Memory.cerebrates = {}; }
        if(this.Memory.cerebrates.spawn == null) { this.Memory.cerebrates.spawn = {}; }

        this.Cerebretes.push(new CerebrateSpawn(this.Memory.cerebrates.spawn));
    }

    Update(): void {

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

    CheckTerritories(): void {
        // Check if hterritoriesives have been added.
        Object.keys(Game.rooms).forEach(name => {
            if (this.Territories.includes(name) == false) {
                // Check if we have the controller for this hive/room.
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

        // Check if any territories have been removed.
        this.Territories.forEach(name => {
            if (Object.keys(Game.rooms).includes(name) == true) {
                // Check if we have the controller for this hive/room.
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