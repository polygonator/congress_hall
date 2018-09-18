const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const defaultConfig = require('./default.config');
const babelConfig = require('./babel.config.js');

function WebpackShellPlugin(options) {
	const defaultOptions = {
		onBuildEnd: null
	};
	this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
	const options = this.options; // eslint-disable-line prefer-destructuring
	compiler.plugin('after-emit', (compilation, callback) => {
		if (options.onBuildEnd) {
			console.log('Executing post-build scripts');
			options.onBuildEnd();
		}
		callback();
	});
};

function onBuildEnd() {
	fs.copy(
		path.resolve(__dirname, '..', 'entrypoints', 'server', 'templates'), // source
		path.resolve(__dirname, '..', 'build', 'server', 'templates') // dest
	);
}

module.exports = {...defaultConfig, mode: 'production',
	entry: 'server',
	target: 'node',
	devtool: 'source-map',
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, '..', 'build', 'server'),
		libraryTarget: 'commonjs2'
	},
	externals: [nodeExternals()],

	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			options: {
				babelrc: false,
				presets: babelConfig.getPresets('production', true),
				plugins: babelConfig.getPlugins('production', true)
			},
			exclude: /node_modules/
		}]
	},

	plugins: [
		new WebpackShellPlugin({onBuildEnd}),
		new webpack.IgnorePlugin(/\.css$/),
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false
		})
	],
	node: false};
