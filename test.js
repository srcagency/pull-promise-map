'use strict';

var Promise = require('bluebird');
var pull = require('pull-stream');
var test = require('tape');

var map = require('./');

test(function( t ){
	t.plan(2);

	pull(
		pull.values([ 1, 2, 3 ]),
		map(v => Promise.resolve(2 * v)),
		pull.collect(function( err, vs ){
			t.notOk(err);
			t.deepEqual(vs, [ 2, 4, 6 ]);
		})
	);
});

test('Rejection', function( t ){
	t.plan(1);

	pull(
		pull.values([ 1, 2, 3 ]),
		map(v => Promise.reject(new Error('reason'))),
		pull.collect(function( err, vs ){
			t.equal(err.message, 'reason');
		})
	);
});

test('Not promise returning', function( t ){
	t.plan(2);

	pull(
		pull.values([ 1, 2, 3 ]),
		map(v => v * 2),
		pull.collect(function( err, vs ){
			t.notOk(err);
			t.deepEqual(vs, [ 2, 4, 6 ]);
		})
	);
});
