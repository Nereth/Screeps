import {Unit} from './Unit'

export class UnitMiner extends Unit {

	// Variables

	// Functions

	get State(): UnitMiner.State { return this.memory.state; }
	set State(state: UnitMiner.State) { this.memory.state = state; }

	constructor(id: string) {
		super(id);
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