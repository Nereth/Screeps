"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    var Unit;
    (function (Unit) {
        Unit[Unit["Unknown"] = 0] = "Unknown";
        Unit[Unit["Miner"] = 1] = "Miner";
        Unit[Unit["Courier"] = 2] = "Courier";
        Unit[Unit["Storage"] = 3] = "Storage";
    })(Unit = Role.Unit || (Role.Unit = {}));
    var Crew;
    (function (Crew) {
        Crew[Crew["Unknown"] = 0] = "Unknown";
        Crew[Crew["Harvest"] = 1] = "Harvest";
    })(Crew = Role.Crew || (Role.Crew = {}));
})(Role = exports.Role || (exports.Role = {}));
