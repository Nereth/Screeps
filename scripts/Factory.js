const CreepFactory = require('Factory.Creep');

var Factory = {
	Creep: new CreepFactory(),

	Update: function () {
		this.Creep.Update();
	}
}

module.exports = Factory;