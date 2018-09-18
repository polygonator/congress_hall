const checkEngines = require('check-engines');

checkEngines(err => {
	if (err) {
		throw err;
	}
});

const front = require('./production.front.config');
const node = require('./production.node.config');

module.exports = [front, node];
