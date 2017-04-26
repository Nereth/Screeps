
var Infastructure = {

	Harvester: class Harvester extends Creep {
		/**
		 *
		 * @param {Creep} creep
		 * @param {number} level
		 */
		constructor(creep, level) {
			super(creep);
			this.memory.role = 'harvester';
			this.memory.level = level;
		}

		Update() {
			console.log('Update Harvester ' + this.name);
		}
	},

	HarvestGroup: class {
		constructor() {
			this.harvesters = new Array();
		}

		get Harvesters() { return this.harvesters; }

		/** @param {Harvester} harvester */
		AddHarvester(harvester) {
			console.log(harvester);
			this.harvesters.push(harvester);
		}

		Update() {
			for (var creep in this.harvesters) {
				creep.Update();
			}
		}
	},

	
	Spawn: class Spawn {
		/**
		 *
		 * @param {string} spawnName
		 */
		constructor(spawnName) {
			this.spawnName = spawnName;
			this.groups = new Infastructure.HarvestGroup();
		}

		get Structure() { return Game.spawns[this.spawnName]; }

		/**
		 * Updates spawn every tick.
		 */
		Update() {
			if (this.Structure.spawning == null && this.Structure.canCreateCreep([WORK, CARRY, MOVE]) == OK) {
				this.CreateHarvester(0);

				console.log('Spawn Creating Harvester');
			}

			this.groups.Update();
		}

		/**
		 *
		 * @param {number} level
		 */
		CreateHarvester(level) {
			if (level == 0) {
				var newHarvester = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE]);

				console.log('new Harvester ' + Game.creeps[newHarvester]);

				this.groups.AddHarvester(new Infastructure.Harvester(Game.creeps[newHarvester], level));
			}
		}
	}
};

module.exports = Infastructure;