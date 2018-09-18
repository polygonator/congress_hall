const path = require('path');

const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const defaultConfig = require('./default.config');
const babelConfig = require('./babel.config.js');

const appPaths = [
	path.resolve(__dirname, '..', 'config'),
	path.resolve(__dirname, '..', 'app'),
	path.resolve(__dirname, '..', 'utils'),
	path.resolve(__dirname, '..', 'entrypoints', 'client')
];
const fontsPath = [
	path.resolve(__dirname, '..', 'app', 'fonts')
];

module.exports = {...defaultConfig, mode: 'production',
	entry: {
		app: [
			'core-js/modules/es6.symbol',
			'core-js/modules/es6.object.assign',
			'core-js/modules/es6.promise',
			'core-js/modules/es6.array.fill',
			'core-js/modules/es7.array.includes',
			'core-js/es6/map',
			'core-js/es6/set',
			'client'
		]
	},

	output: {
		filename: 'application-[hash]-[name].js',
		path: path.resolve(__dirname, '..', 'public', 'assets'),
		publicPath: '/public/assets/'
	},

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
					presets: babelConfig.getPresets('production'),
					plugins: babelConfig.getPlugins('production')
				},
				include: appPaths
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: {
						loader: 'style-loader',
						options: {
							hmr: false
						}
					},
					use: [{
						loader: 'css-loader',
						options: {
							module: true,
							importLoaders: 1,
							localIdentName: '[hash:base64:5]'
						}
					}, {
						loader: 'postcss-loader'
					}]
				})
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
					}, {
						loader: 'image-webpack-loader',
						query: {
							progressive: true,
							optimizationLevel: 7,
							interlaced: true
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: false
	},

	plugins: [
		// new CleanWebpackPlugin(['assets'], {
		// 	root: path.resolve(__dirname, '..', 'public'),
		// 	verbose: true,
		// 	dry: false,
		// 	exclude: ['modernizr.js']
		// }),
		new ExtractTextPlugin({
			filename: 'application-[hash]-[name].optimize.css',
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new DotenvPlugin({sample: path.resolve(__dirname, '..', '.env.sample'), allowEmptyValues: true}),
		new webpack.DefinePlugin({
			__BROWSER__: true,
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				ecma: 5,
				compress: {
					warnings: false,
					// Disabled because of an issue with Uglify breaking seemingly valid code:
					// https://github.com/facebook/create-react-app/issues/2376
					// Pending further investigation:
					// https://github.com/mishoo/UglifyJS2/issues/2011
					comparisons: false
				},
				mangle: {
					safari10: true
				},
				output: {
					comments: false,
					// Turned on because emoji and regex is not minified properly using default
					// https://github.com/facebook/create-react-app/issues/2488
					ascii_only: true
				}
			},
			// Use multi-process parallel running to improve the build speed
			// Default number of concurrent runs: os.cpus().length - 1
			parallel: true,
			// Enable file caching
			cache: true
		}),
		new CompressionPlugin({
			asset: '[file].gz',
			regExp: /\.js$|\.css$/
		}),
		new AssetsPlugin({
			path: path.join(__dirname, '..', 'public', 'assets'),
			filename: 'assets.json'
		})
	],
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}};
