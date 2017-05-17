import {Role} from './Role'

export class Unit extends Creep {

	// Variables

	// Functions
	get Memory(): any { return this.memory; }
	set Memory(memory: any) { this.memory = memory; }

	get Role(): Role.Unit { return this.memory.role; }
	set Role(role: Role.Unit) { this.memory.role = role; }

	constructor(id: string) {
		super(id);

		this.Role = Role.Unit.Unknown;
	}

	Update() {
	}
}