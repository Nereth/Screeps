import {MemoryAccessor} from './Memory.Accessor'
import {Hive} from './Hive'

export class Cerebrate extends MemoryAccessor {

    // Variables
   private _hives: Array<{ id: string, hive: Hive }> = new Array();

    // Functions
    constructor(memory: Object) {
        super(memory);

        if (this.Memory.hives == null) { this.Memory.hives = {} }

        for(let roomId in this.Memory.hives) {
            this.Hive.push({id: roomId, hive: new Hive(this.Memory.hives[this.Memory.hives.length - 1], roomId)});
        }
    }

    get Hive():Array<{ id: string, hive: Hive }> { return this._hives; }

    HiveAdded(roomId: string) {
        let addHive = true;

        for(let index in this.Hive) {
            if(this.Hive[index].id == roomId) {
                addHive = false;
                break;
            }
        }

        if(addHive == true) {
            this.Memory.hives[roomId] = {};
            this.Hive.push({id: roomId, hive: new Hive(this.Memory.hives[this.Memory.hives.length - 1], roomId)});
        }
    }

    HiveRemoved(roomId: string) {
        this.Hive.forEach(hive => {
            if(hive.id == roomId) {
                delete this.Memory.hives[roomId];
                this.Hive.splice(this.Hive.indexOf(hive));
            }
        });
    }

    PreUpdate(): void {
        this.Hive.forEach(hive => {
            hive.hive.PreUpdate();
        });
    }

    Update(): void {
        this.Hive.forEach(hive => {
            hive.hive.Update();
        });
    }

    PostUpdate(): void {
        this.Hive.forEach(hive => {
            hive.hive.PostUpdate();
        });
    }
}