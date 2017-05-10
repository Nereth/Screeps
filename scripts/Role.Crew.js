const CrewHarvest = require('./Crew.Harvest');
const CrewInfastructure = require('./Crew.Infastructure');

const RoleCrew = {
	Harvest: {
		Id: 'Harvest',
		Class: CrewHarvest,
	},
	Infastructure: {
		Id: 'Infastructure',
		Class: CrewInfastructure,
	},
};

module.exports = RoleCrew;