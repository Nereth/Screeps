const RoomBase = require('./Room.Base');
const Factory = require('./Factory');

var rooms = null;

module.exports.loop = function () {



	Object.keys(Game.rooms).forEach(roomName => {
		new RoomBase(roomName).Update();
	});

	Factory.Update();
}