'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();
var functionsHaveConfigurableNames = require('functions-have-names').functionsHaveConfigurableNames();
var hasStrictMode = require('has-strict-mode')();

var runTests = require('./tests');

test('shimmed', function (t) {
	t.test('ArrayBuffer support', { skip: typeof ArrayBuffer === 'undefined' }, function (st) {
		var descriptor = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'detached');

		st.equal(descriptor.get.length, 0, 'ArrayBuffer#detached getter has a length of 0');

		st.test('Function name', { skip: !functionsHaveNames }, function (s2t) {
			s2t.equal(descriptor.get.name, functionsHaveConfigurableNames ? 'get detached' : 'detached', 'ArrayBuffer#detached getter has name "get detached" (or "detached" if function names are not configurable)');
			s2t.end();
		});

		st.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
			et.equal(false, isEnumerable.call(ArrayBuffer.prototype, 'detached'), 'ArrayBuffer#detached is not enumerable');
			et.end();
		});

		st.test('bad array/this value', { skip: !hasStrictMode }, function (s2t) {
			s2t['throws'](function () { return descriptor.get.call(undefined); }, TypeError, 'undefined is not an object');
			s2t['throws'](function () { return descriptor.get.call(null); }, TypeError, 'null is not an object');
			s2t.end();
		});

		t.test('has the correct descriptor', function (s2t) {
			s2t.equal(descriptor.configurable, true);
			s2t.equal(descriptor.enumerable, false);
			s2t.equal(typeof descriptor.get, 'function');
			s2t.equal(descriptor.set, undefined);
			s2t.end();
		});

		runTests(callBind(descriptor.get), st);

		st.end();
	});

	t.end();
});
