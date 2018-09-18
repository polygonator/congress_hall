const path = require('path');
const checkEngines = require('check-engines');

checkEngines(err => {
	if (err) {
		throw err;
	}
});

const webpackHost = require('ip').address();
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const babelConfig = require('./babel.config.js');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./../config');
const defaultConfig = require('./default.config');

const appPaths = [
	path.resolve(__dirname, '..', 'config'),
	path.resolve(__dirname, '..', 'app'),
	path.resolve(__dirname, '..', 'utils'),
	path.resolve(__dirname, '..', 'entrypoints', 'client')
];
const fontsPath = [
	path.resolve(__dirname, '..', 'app', 'fonts')
];

module.exports = {...defaultConfig, mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: {
		app: [
			'core-js/modules/es6.symbol',
			'core-js/modules/es6.object.assign',
			'core-js/modules/es6.promise',
			'core-js/modules/es6.array.fill',
			'core-js/modules/es7.array.includes',
			'core-js/es6/map',
			'core-js/es6/set',
			`webpack-dev-server/client?http://${webpackHost}:${config.webpackPort}`,
			'client'
		]
	},

	output: {
		filename: 'application-[hash]-[name].js',
		path: path.resolve(__dirname, '..', 'public', 'assets'),
		publicPath: `http://${webpackHost}:${config.webpackPort}/assets/`,
		chunkFilename: '[id].chunk.js',
		hotUpdateChunkFilename: '[hash].hot-update.js' // https://github.com/kossnocorp/assets-webpack-plugin/issues/85
	},

	plugins: [
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static',
		// 	openAnalyzer: false
		// }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new AssetsPlugin({
			path: path.join(__dirname, '..', 'public', 'assets'),
			filename: 'assets.json'
		}),
		new DotenvPlugin({sample: path.resolve(__dirname, '..', '.env.sample'), allowEmptyValues: true}),
		new webpack.DefinePlugin({__BROWSER__: true}),
		new WebpackShellPlugin({onBuildEnd: ['npm run browsersync']})
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				use: [
					{
						options: {
							eslintPath: require.resolve('eslint'),
							baseConfig: {
								extends: [require.resolve('eslint-config-react-app')]
							},
							// @remove-on-eject-begin
							ignore: false,
							useEslintrc: false
							// @remove-on-eject-end
						},
						loader: 'eslint-loader'
					}
				],
				include: appPaths
			}, {
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: babelConfig.getPresets('development'),
					plugins: babelConfig.getPlugins('development')
				},
				include: appPaths
			}, {
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							module: true,
							importLoaders: 1,
							localIdentName: '[path][name]__[local]'
						}
					},
					{
						loader: 'postcss-loader'
					}
				]
			}, {
				test: /\.(otf|ttf|eot|svg|woff2?)(\?v=[a-z0-9=.]+)?$/i,
				include: fontsPath,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			}, {
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				include: appPaths,
				exclude: fontsPath,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[sha512:hash:base64:7].[ext]'
						}
					}
				]
			}
		]
	},

	devServer: {
		port: config.webpackPort,
		host: webpackHost,
		compress: true,
		noInfo: true,
		quiet: true,
		hot: true,
		historyApiFallback: true,
		overlay: true,
		stats: {colors: true},
		headers: {'Access-Control-Allow-Origin': '*'}
	}};
