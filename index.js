export default function map(transform) {
	return (read) => (end, cb) =>
		read(end, function (end, chunk) {
			if (end !== null) {
				return cb(end)
			}

			return Promise.resolve(transform(chunk)).then(
				(v) => cb(null, v),
				cb,
			)
		})
}
