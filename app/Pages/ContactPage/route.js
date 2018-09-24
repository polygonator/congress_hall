if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => c(require);
}

module.exports = {
	path: '/contacts',
	getIndexRoute(location, callback) {
		return require.ensure([], require => {
			callback(null, {
				component: require('./ContactPage').default
			});
		}, 'Contact');
	}
};

