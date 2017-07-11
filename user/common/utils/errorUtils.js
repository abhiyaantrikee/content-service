'use strict';

var extend = require('util')._extend;

/**
 *
 * @param {Error} err
 * @param {String} errorCode
 * @returns {*}
 */
exports.populateError = function(err, errorCode) {
	if(!errorCode || !err)
		return new Error('Invalid Error call');
	return extend(err,errorCode);
};