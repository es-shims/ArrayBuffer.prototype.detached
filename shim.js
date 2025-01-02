'use strict';

var supportsDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var getPolyfill = require('./polyfill');
var defineProperty = Object.defineProperty;
var $TypeError = require('es-errors/type');
var $SyntaxError = require('es-errors/syntax');
var getProto = require('get-proto');

module.exports = function shimDetached() {
	if (!supportsDescriptors || !getProto) {
		throw new $TypeError('ArrayBuffer.prototype.detached requires a true ES5+ environment that supports property descriptors');
	}
	if (typeof ArrayBuffer !== 'function') {
		throw new $SyntaxError('ArrayBuffer is not available in this environment');
	}

	var polyfill = getPolyfill();
	var proto = ArrayBuffer.prototype;
	var descriptor = gOPD(proto, 'detached');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty(proto, 'detached', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};
