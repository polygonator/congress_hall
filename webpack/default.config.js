const path = require('path');

module.exports = {
	resolve: {
		alias: {
			config: path.resolve(__dirname, '..', 'config'),
			app: path.resolve(__dirname, '..', 'app'),
			components: path.resolve(__dirname, '..', 'app', 'components'),
			Base: path.resolve(__dirname, '..', 'app', 'components', 'Base'),
			Grid: path.resolve(__dirname, '..', 'app', 'components', 'Grid'),
			Modules: path.resolve(__dirname, '..', 'app', 'components', 'Modules'),
			Roots: path.resolve(__dirname, '..', 'app', 'components', 'Roots'),
			fonts: path.resolve(__dirname, '..', 'app', 'fonts'),
			images: path.resolve(__dirname, '..', 'app', 'shared', 'images'),
			reducers: path.resolve(__dirname, '..', 'app', 'reducers'),
			utils: path.resolve(__dirname, '..', 'utils'),
			entrypoints: path.resolve(__dirname, '..', 'entrypoints'),
			client: path.resolve(__dirname, '..', 'entrypoints', 'client'),
			server: path.resolve(__dirname, '..', 'entrypoints', 'server')
		}
	}
};
