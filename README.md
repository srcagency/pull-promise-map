# Pull promise map

`map` implementation for pull-streams supporting regular values and promises
as return values.

Similar to [pull-promise's through](https://github.com/queckezz/pull-promise)
but with theses differences:

- Non-promise values allowed

	Convenient when you switch between async an sync transforms. Aligns closer
	to how most promise libraries' `map`, `reduce`, etc. works.

- Allows custom `Promise` implementations

	Works with [Bluebird](https://github.com/petkaantonov/bluebird) without
	throwing the `(node:6486) Warning: a promise was created in a handler but
	was not returned from it`.

## Example

```js
var pull = require('pull-stream');
var map = require('pull-promise-map');

// map.Promise = require('bluebird');	// optional

pull(
	pull.values([ 1, 2, 3 ]),
	map(x => Promise.resolve(x * 2)),
	map(x => x + 1),
	pull.log()
);
// -> 3, 5, 7
```
