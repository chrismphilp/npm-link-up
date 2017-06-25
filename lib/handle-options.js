"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("./logging");
exports.getIgnore = function (conf, alwaysIgnoreThese) {
    var ignore = (conf.ignore || []).concat(alwaysIgnoreThese)
        .filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
    }).map(function (item) {
        return new RegExp(item);
    });
    if (ignore.length > 0) {
        console.log('\n => NPM Link Up will ignore paths that match any of the following => ');
        ignore.forEach(function (item) {
            logging_1.logWarning("ignored => " + item);
        });
    }
    return ignore;
};