import React from 'react';
import {render} from 'react-dom';
import get from 'lodash/get';
import RouterContext from 'react-router/lib/RouterContext';
import Root from 'Roots/Root';
import ErrorPage from 'app/Pages/ErrorPage';
import {scrollUp} from 'utils/dom';

export default ($root, store) => (location, props, hotReload, callback) => new Promise(resolve => {
	render(
		<Root store={store}>
			<RouterContext
				history={history} // eslint-disable-line no-restricted-globals
				{...props}
			/>
		</Root>, $root, () => {
			if (location.action !== 'REPLACE' && !hotReload) {
				scrollUp();
			}
			if (callback) {
				callback();
			}
			return resolve();
		}
	);
});

export const renderErrorPage = ($root, store, err, callback) => render(
	<Root store={store}>
		<ErrorPage pure_page status={get(err, 'status', 500)}/>
	</Root>
	, $root, callback);
