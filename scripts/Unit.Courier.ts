import {Unit} from './Unit'
import {Role} from './Role'

export class UnitCourier extends Unit {

	// Variables

	// Functions

	get State(): UnitCourier.State { return this.Memory.state; }
	set State(state: UnitCourier.State) { this.Memory.state = state; }

	constructor(id: string) {
		super(id);

		this.Role = Role.Unit.Courier;
	}

	Update() {

	}
}

export module UnitCourier {
	export enum State {
		Idle,
		Obtain,
		Return,
	}

	export const Level = [
		[CARRY, CARRY, MOVE, MOVE],
	]
}