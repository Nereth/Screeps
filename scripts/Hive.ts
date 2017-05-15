import { MemoryAccessor } from './Memory.Accessor'

export class Hive extends MemoryAccessor {

    // Variables
    private _room: Room;

    // Functions

    get Room():Room { return this._room; }

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