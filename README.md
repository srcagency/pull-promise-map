# Pull promise map

`map` implementation for pull-streams supporting regular values and promises as
return values.

Similar to [pull-promise's through](https://github.com/queckezz/pull-promise)
with the key difference that _non-promise return values are allowed_ aligning
with how most promise libraries work.

## Example

```js
import pull from 'pull-stream'
import map from 'pull-promise-map'

pull(
	pull.values([1, 2, 3]),
	map((x) => Promise.resolve(x * 2)),
	map((x) => x + 1),
	pull.log(),
)
// -> 3, 5, 7
```
