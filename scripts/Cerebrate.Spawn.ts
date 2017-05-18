import {Cerebrate} from './Cerebrate'
import {Role} from './Role'

export class CerebrateSpawn extends Cerebrate {

    // Variables
    static Instance: CerebrateSpawn;

	//_roomData: Map<string, CerebrateSpawn.Room> = new Map();

    // Functions
	private get Rooms(): Map<string, CerebrateSpawn.Room> { return this.Memory.rooms; }

    get Requests(): any { return this.Memory.requests; }
	set Requests(requests:any) { this.Memory.requests = requests; }

	get Reserves() { return this.Memory.reserves; }
	set Reserves(reserves) { this.Memory.reserves = reserves; }

    constructor(memory: Object) {
        super(memory);

        if(CerebrateSpawn.Instance == null) {
            CerebrateSpawn.Instance = this;
        }

		if(this.Memory.requests == null) { this.Memory.requests = []; }
		if(this.Memory.reserves == null) { this.Memory.reserves = []; }

		if(this.Memory.rooms == null) { this.Memory.rooms = new Map<string, CerebrateSpawn.Room>(); }
    }

    RoomAdded(roomId: string) {
        super.RoomAdded(roomId);

		if(this.Rooms.has(roomId) == false) {
			Game.rooms[roomId].find<StructureSpawn>(FIND_MY_SPAWNS).forEach(spawn => {
				console.log('test1', roomId);
				this.Rooms.set(roomId, { Spawns: new Array<string>() });
				this.Rooms.get(roomId).Spawns.push(spawn.id);
			});

			
		}
    }

    RoomRemoved(roomId: string) {
        super.RoomRemoved(roomId);
    }

    PreUpdate(): void {
        this.HandleRequests();
    }

    Update(): void {
        console.log('Cerebrate Spawn Update');
    }

    PostUpdate(): void {

    }

	/**
	* Request a certain certain creep be created.
	* If requested creep type is spawned, return it.
    */
    RequestUnit(role:Role.Unit, priority:number) {
		let request:any = { name: null, role: role, priority: priority };
		
		if(this.Reserves.length != 0) {
			for(let i in this.Reserves) {
				let reserve = this.Reserves[i];
				if(request.role == reserve.role && request.priority == reserve.priority) {
					return this.Reserves.splice(i, 1)[0].name;
				}
			}
		}
		else if(this.Requests.length == 0) {
			this.Requests.push(request);
		}
		else {
			for(let i in this.Requests) {
				if(this.Requests[i].priority < request.priority) {
					this.Requests.splice(i, 0, request);
					break;
				}
			}
		}
	}

    /**
	 * Sorts creep creation requests, sends newly created
	 * name and role for creep to the crew that requested them.
	 */
	HandleRequests() {
		for(let name in Game.spawns) {
			for(let i in this.Requests) {
				let spawn = Game.spawns[name];
				let request = this.Requests[i];
				let role = request.role;

				if (spawn.canCreateCreep(role.Level[0]) == OK) {
					let name = spawn.createCreep(role.Level[0], null, { role: request.role });
					if(name != null) {
						request.name = name;
						this.Reserves.push(request);
						this.Requests.splice(i, 1);
						break;
					}
				}
			}
		}

		this.Requests = [];
	}
}

export module CerebrateSpawn {
	export type Room = {
		Spawns: Array<string>
	}
}