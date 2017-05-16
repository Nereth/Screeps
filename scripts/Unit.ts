
export class Unit extends Creep {

	// Variables

	// Functions
	get Role(): Unit.Role { return this.memory.role; }
	set Role(role: Unit.Role) { this.memory.role = role; }

	constructor(id: string) {
		super(id);

		this.memory.role = Unit.Role.Unknown;
	}

	Update() {

	}
}

export module Unit {
	export enum Role {
		Unknown,
		Miner,
	}
}