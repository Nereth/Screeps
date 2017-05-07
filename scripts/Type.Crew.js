const CrewHarvest = require('./Crew.Harvest');
const CrewInfastructure = require('./Crew.Infastructure');

const TypeCrew = {
	Harvest: {
		Id: 'Harvest',
		Class: CrewHarvest,
	},
	Infastructure: {
		Id: 'Infastructure',
		Class: CrewInfastructure,
	},
};

module.exports = TypeCrew;