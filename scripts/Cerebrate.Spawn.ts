import { Cerebrate } from './Cerebrate.Base'

export class CerebrateSpawn extends Cerebrate {

    // Variables

    // Functions
    constructor(memory: Object) {
        super(memory);
    }

    HiveAdded(roomId: string) {
        super.HiveAdded(roomId);
    }

    HiveRemoved(roomId: string) {
        super.HiveRemoved(roomId);
    }

    PreUpdate(): void {

    }

    Update(): void {
        console.log('Cerebrate Spawn Update');
    }

    PostUpdate(): void {

    }
}