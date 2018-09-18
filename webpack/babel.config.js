const path = require('path');

function getPresets(env, node) {
	return [
		['@babel/preset-env', {...(node ? {targets: {node: 'current'}} : {
			// `entry` transforms `@babel/polyfill` into individual requires for
			// the targeted browsers. This is safer than `usage` which performs
			// static code analysis to determine what's required.
			// This is probably a fine default to help trim down bundles when
			// end-users inevitably import '@babel/polyfill'.
			useBuiltIns: 'entry',
			// Do not transform modules to CJS
			modules: false
		})}],
		['@babel/preset-react', {
			// Adds component stack to warning messages
			// Adds __self attribute to JSX which React will use for some warnings
			development: env !== 'production',
			// Will use the native built-in instead of trying to polyfill
			// behavior for any plugins that require one.
			useBuiltIns: !node
		}]
	];
}

function getCommonPlugins(env, node) {
	const common_plugins = [
		'babel-plugin-macros',
		// Necessary to include regardless of the environment because
		// in practice some other transforms (such as object-rest-spread)
		// don't work without it: https://github.com/babel/babel/issues/7215
		'@babel/plugin-proposal-function-bind',
		'@babel/plugin-transform-destructuring',
		// class { handleClick = () => { } }
		'@babel/plugin-proposal-class-properties',
		// The following two plugins use Object.assign directly, instead of Babel's
		// extends helper. Note that this assumes `Object.assign` is available.
		[
			'@babel/plugin-proposal-object-rest-spread', {
				useBuiltIns: true
			}
		],
		// Polyfills the runtime needed for async/await and generators
		'@babel/plugin-transform-runtime'
	];
	const node_plugins = [
		['css-modules-transform', {
			mode: 'local',
			rootDir: path.resolve(__dirname, '../'),
			extensions: ['.css'],
			generateScopedName: env === 'production' ? '[hash:base64:5]' : '[path][name]__[local]'
		}]
	];
	return node ? common_plugins.concat(node_plugins) : common_plugins;
}

const plugins_production = [
	['transform-react-remove-prop-types', {removeImport: true}]
];

function getPlugins(env, node) {
	return env === 'production' ? getCommonPlugins(env, node).concat(plugins_production) : getCommonPlugins(env, node);
}

module.exports = {
	getPresets,
	getPlugins
};
