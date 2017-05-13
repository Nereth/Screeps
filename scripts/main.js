const RoomBase = require('./Room.Base');
const Manager = require('./Manager');

var rooms = null;

module.exports.loop = function () {

	Manager.PreUpdate();

	Object.keys(Game.rooms).forEach(roomName => {
		new RoomBase(roomName).Update();
	});

	Manager.Update();
}