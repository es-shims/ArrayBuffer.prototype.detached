'use strict';

var inspect = require('object-inspect');
var DetachArrayBuffer = require('es-abstract/2022/DetachArrayBuffer');

var forEach = require('for-each');
var v = require('es-value-fixtures');

module.exports = function runTests(detached, t) {
	forEach(v.primitives.concat(v.objects), function (nonAB) {
		t['throws'](
			function () { detached(nonAB); },
			TypeError,
			inspect(nonAB) + ' is not an ArrayBuffer'
		);
	});

	t.test('ArrayBuffers', { skip: typeof ArrayBuffer === 'undefined' }, function (st) {
		var ab = new ArrayBuffer(0);
		st.equal(detached(ab), false, 'ArrayBuffer is not detached');

		try {
			DetachArrayBuffer(ab);
		} catch (e) {
			if (e instanceof SyntaxError) {
				st.skip('Detaching ArrayBuffer is not supported');
				return st.end();
			}
		}

		st.equal(detached(ab), true, 'ArrayBuffer is now detached');

		return st.end();
	});

	t.test('SharedArrayBuffers', { skip: typeof SharedArrayBuffer === 'undefined' }, function (st) {
		var sab = new SharedArrayBuffer(0);

		st['throws'](
			function () { detached(sab); },
			TypeError,
			inspect(sab) + ' is not an ArrayBuffer'
		);

		st.end();
	});
};
