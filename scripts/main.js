const Infastructure = require('./Spawner');

module.exports.loop = function () {

	let infSpawn = new Infastructure.Spawn('Spawn1');

	infSpawn.Update();
}