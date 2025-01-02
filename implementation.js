'use strict';

var IsDetachedBuffer = require('es-abstract/2024/IsDetachedBuffer');

var setFunctionName = require('set-function-name');
var isSharedArrayBuffer = require('is-shared-array-buffer');

var $TypeError = TypeError;

module.exports = setFunctionName(function detached() {
	var O = this; // step 1

	if (isSharedArrayBuffer(O)) {
		throw new $TypeError('`this` value must be an ArrayBuffer, not a SharedArrayBuffer');
	}

	return IsDetachedBuffer(O); // steps 2, 4
}, 'get detached', true);
