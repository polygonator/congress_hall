const path = require('path');

const babelConfig = require(path.resolve(__dirname, 'webpack', 'babel.config.js'));
require('@babel/register')({ // eslint-disable-line import/no-unassigned-import
	presets: babelConfig.getPresets('development', true),
	plugins: babelConfig.getPlugins('development', true)
});
require('entrypoints/server'); // eslint-disable-line import/no-unassigned-import

