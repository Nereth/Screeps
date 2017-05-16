import { MemoryAccessor } from './Memory.Accessor'
import { Cerebrate } from './Cerebrate.Base'
import { CerebrateSpawn } from './Cerebrate.Spawn'

export class Overmind extends MemoryAccessor {

    // Variables
    private _cerebrates: Array<Cerebrate> = new Array<Cerebrate>();

    get Hives(): Array<string> { return this.Memory.hives; }
    get Cerebretes(): Cerebrate[] { return this._cerebrates; }

    // Functions
    constructor(memory: Object) {
        super(memory);

        console.log('Creating Cerebrates');

        // Initialize Overlord memory.
        if(this.Memory.hives == null) { this.Memory.hives = Array<string>(); }

        // Initialize cerebrate memory.
        if(this.Memory.cerebrates == null) { this.Memory.cerebrates = {}; }
        if(this.Memory.cerebrates.spawn == null) { this.Memory.cerebrates.spawn = {}; }

        this.Cerebretes.push(new CerebrateSpawn(this.Memory.cerebrates.spawn));
    }

    Update(): void {

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

    CheckHives(): void {
        // Check if hives have been added.
        Object.keys(Game.rooms).forEach(name => {
            if (this.Hives.includes(name) == false) {
                // Check if we have the controller for this hive/room.
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

        // Check if any hives have been removed.
        this.Hives.forEach(name => {
            if (Object.keys(Game.rooms).includes(name) == true) {
                // Check if we have the controller for this hive/room.
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