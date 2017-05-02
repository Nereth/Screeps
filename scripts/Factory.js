const CreepFactory = require('Factory.Creep');

var Factory = {
	Creep: CreepFactory,

	Update: function () {
		this.Creep.Update();
	}
}

module.exports = Factory;