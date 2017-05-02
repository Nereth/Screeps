const RoomBase = require('./Room.Base');
const Factory = require('./Factory');

module.exports.loop = function () {

	for (var i in Memory.creeps) {
		if (!Game.creeps[i]) {
			delete Memory.creeps[i];
		}
	}

	Object.keys(Game.rooms).forEach(roomName => {
		new RoomBase(roomName).Update();
	});


	Factory.Update();
}