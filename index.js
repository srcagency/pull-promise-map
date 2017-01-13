'use strict';

module.exports = map;

var native = typeof Promise !== 'undefined' && Promise;

function map( transform, Promise ){
	Promise = Promise || map.Promise || native;

	return function( read ){
		return function( end, cb ){
			return read(end, function( end, chunk ){
				if (end !== null)
					return cb(end);

				return Promise
					.resolve(transform(chunk))
					.then(function( v ){
						return cb(null, v);
					}, cb);
			});
		}
	}
}
