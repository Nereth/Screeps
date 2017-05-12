const RoomBase = require('./Room.Base');
const Factory = require('./Factory');
const Manager = require('./Manager');

var rooms = null;

module.exports.loop = function () {

	Object.keys(Game.rooms).forEach(roomName => {
		new RoomBase(roomName).Update();
	});

	Factory.Update();

	Manager.Update();

	//Manager.Build.RequestConstruction(STRUCTURE_ROAD, new RoomPosition(21, 21, 'sim'));

	//let test = Manager.Build.RequestTask();

	//console.log('Requested Task:', test);

}