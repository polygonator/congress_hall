const bs = require('browser-sync').create('rsk');
const config = require('./config');

bs.init(null, {
	ui: {
		port: config.browserSyncUIPort
	},
	port: config.browserSyncPort,
	proxy: `http://${config.host}:${config.port}`
});
