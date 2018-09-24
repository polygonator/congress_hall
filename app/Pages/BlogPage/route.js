if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => c(require);
}

module.exports = {
	path: '/blog',
	getIndexRoute(location, callback) {
		return require.ensure([], require => {
			callback(null, {
				component: require('./BlogPage').default
			});
		}, 'Blog');
	}
};

