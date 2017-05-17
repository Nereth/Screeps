import {Unit} from './Unit'
import {Role} from './Role'

export class UnitMiner extends Unit {

	// Variables

	// Functions

	get State(): UnitMiner.State { return this.Memory.state; }
	set State(state: UnitMiner.State) { this.Memory.state = state; }

	get TakeFrom() { return this.Memory.takeFrom; }
	set TakeFrom(takeFrom) { this.Memory.takeFrom = takeFrom; }

	get TakeTo() { return this.Memory.takeTo; }
	set TakeTo(takeTo) { this.Memory.takeTo = takeTo; }

	constructor(id: string) {
		super(id);

		this.Role = Role.Unit.Miner;
	}

	Update() {

	}
}

export module UnitMiner {
	export enum State {
		Idle,
		Mine,
		Return,
	}

	export const Level = [
		[WORK, CARRY, MOVE],
	]
}