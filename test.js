import collect from 'psp-collect'
import pull from 'pull-stream'
import test from 'tape'
import map from './index.js'

test((t) => {
	return pull(
		pull.values([1, 2, 3]),
		map((v) => Promise.resolve(2 * v)),
		collect(),
	).then((vs) => t.deepEqual(vs, [2, 4, 6]))
})

test('Rejection', (t) => {
	return pull(
		pull.values([1, 2, 3]),
		map((v) => Promise.reject(new Error('reason'))),
		collect(),
	).catch((err) => t.equal(err.message, 'reason'))
})

test('Not promise returning', (t) => {
	return pull(
		pull.values([1, 2, 3]),
		map((v) => v * 2),
		collect(),
	).then((vs) => t.deepEqual(vs, [2, 4, 6]))
})
