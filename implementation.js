'use strict';

var IsDetachedBuffer = require('es-abstract/2023/IsDetachedBuffer');

var functionsHaveConfigurableNames = require('functions-have-names').functionsHaveConfigurableNames();
var supportsDescriptors = require('define-properties').supportsDescriptors;
var isSharedArrayBuffer = require('is-shared-array-buffer');

var $TypeError = TypeError;

module.exports = function detached() {
	var O = this; // step 1

	if (isSharedArrayBuffer(O)) {
		throw new $TypeError('`this` value must be an ArrayBuffer, not a SharedArrayBuffer');
	}

	return IsDetachedBuffer(O); // steps 2, 4
};

if (functionsHaveConfigurableNames && supportsDescriptors) {
	Object.defineProperty(module.exports, 'name', { value: 'get detached' });
}
