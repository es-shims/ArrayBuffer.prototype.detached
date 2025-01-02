'use strict';

var implementation = require('./implementation');

var supportsDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

module.exports = function getPolyfill() {
	if (supportsDescriptors && typeof ArrayBuffer === 'function') {
		var descriptor = gOPD(ArrayBuffer.prototype, 'detached');
		if (descriptor && typeof descriptor.get === 'function') {
			return descriptor.get;
		}
	}
	return implementation;
};
