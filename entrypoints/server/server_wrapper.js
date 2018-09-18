const path = require('path');
const checkEngines = require('check-engines');

checkEngines(err => {
	if (err) {
		throw err;
	}
});

global.__BROWSER__ = false;
require('dotenv-safe').load({
	sample: path.resolve(__dirname, '..', '..', '.env.sample'),
	allowEmptyValues: true
});
require('entrypoints/server/redis').initClient();
require('./server'); // eslint-disable-line import/no-unassigned-import
