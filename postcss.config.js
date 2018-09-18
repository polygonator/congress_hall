const path = require('path');
// tooling
const postcss = require('postcss');

// plugin
const flexWidthPlugin = postcss.plugin('postcss-flex-width-plugin', () => {
	// property pattern
	const propertyMatch = new RegExp('^flex-width$');

	return css => {
		// walk each matching declaration
		css.walkDecls(propertyMatch, decl => {
			decl.cloneBefore({
				prop: 'width',
				value: decl.value
			});
			decl.cloneBefore({
				prop: 'max-width',
				value: decl.value
			});
			decl.cloneBefore({
				prop: 'flex',
				value: `0 0 ${decl.value}`
			});
			// remove the original size declaration
			decl.remove();
		});
	};
});

module.exports = {
	plugins: [
		require('postcss-import')({path: [path.resolve(__dirname)]}),
		require('postcss-cssnext'),
		require('postcss-nested'),
		flexWidthPlugin,
		require('postcss-short-text'),
		require('postcss-short'),
		require('css-mqpacker')
	]
};
