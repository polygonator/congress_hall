import Layout from 'components/Roots/Layout';
import childRoutes from 'app/Pages';

if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => c(require);
}

export default {
	path: '/',
	component: Layout,
	childRoutes,
	getIndexRoute(location, callback) {
		return require.ensure([], require => {
			callback(null, {
				component: require('app/Pages/MainPage').default
			});
		});
	}
};

