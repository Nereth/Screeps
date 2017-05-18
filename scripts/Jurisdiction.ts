import { MemoryAccessor } from './Memory.Accessor'
import {Role} from './Role'
import {Crew} from './Crew'
import {CrewHarvest} from './Crew.Harvest'

export class Jurisdiction extends MemoryAccessor {

    // Variables
    private _room: Room;
    private _crews: Map<Role.Unit, Array<Crew>> = new Map();

    // Functions
    get Room():Room { return this._room; }

    get Crews(): Map<Role.Unit, Array<Crew>> { return this._crews; }

    constructor(memory: Object, roomId:string) {
        super(memory);

        this._room = Game.rooms[roomId];
    }

    PreUpdate(): void {

    }

    Update(): void {

    }

    PostUpdate(): void {
        
    }
}