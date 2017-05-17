import {Unit} from './Unit'
import {Role} from './Role'

export class UnitStorage extends Unit {

	// Variables

	// Functions

	get State(): UnitStorage.State { return this.Memory.state; }
	set State(state: UnitStorage.State) { this.Memory.state = state; }

	constructor(id: string) {
		super(id);

		this.Role = Role.Unit.Storage;
	}

	Update() {

	}
}

export module UnitStorage {
	export enum State {
		Idle,
		Move,
		Distribution,
	}

	export const Level = [
		[CARRY, CARRY, CARRY, CARRY, MOVE],
	]
}