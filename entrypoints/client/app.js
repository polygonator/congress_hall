import history from 'react-router/lib/browserHistory';
import trigger from 'redial/lib/trigger';
import match from './match';
import configureStore from './store';
import configureRender, {renderErrorPage} from './render';
import fetch from 'utils/fetch';

let routes = require('app/routes').default;

class App {
	constructor() {
		this.start = ::this.start;
		this.getStore = ::this.getStore;
		this.getRender = ::this.getRender;
		this.historyListener = ::this.historyListener;
		this.$root = document.getElementById('app-root');
		this.store = undefined;
	}

	/**
	 * Init Redux store
	 * @type {Object}
	 */
	getStore() {
		const parsedStore = JSON.parse(decodeURIComponent(document.querySelector('meta[name="state"]').getAttribute('content')));
		// doesn't configure redux store if server occurs on server side
		if (parsedStore.serverError) {
			this.store = false;
			return;
		}
		this.store = configureStore(parsedStore);
	}

	/**
	 * Init render function
	 * @type {Function}
	 */
	getRender() {
		this.render = configureRender(this.$root, this.store);
	}

	/**
	 * historyListener will be trigger when history will changes.
	 * Firstly we get components for this route (match), then fetch data (if needed), then render application to html element
	 * @type {Function}
	 */
	async historyListener(location, skipFetch, hotReload, callback) {
		try {
			// find all current page components
			const props = await match({location}, routes);

			if (!skipFetch) {
				// prefetch all necessary data from api
				try {
					await trigger('fetch', props.components || [], {dispatch: this.store.dispatch, ...props, location});
				} catch (err) { // eslint-disable-line  unicorn/catch-error-name
					// catch fetching errors
					await fetch.handleErrors(err);
				}
			}
			// after all render page
			await this.render(location, props, hotReload, callback);
		} catch (err) { // eslint-disable-line  unicorn/catch-error-name
			// error handling
			if (process.env.NODE_ENV !== 'production') {
				console.log('client err', err);
			}
			renderErrorPage(this.$root, this.store, err);
		}
	}

	start() {
		this.getStore();
		this.getRender();
		// hydrate SSR content
		/**
		 * need to clear server-side generated html before hydrate client-side generated html
		 * if we can't be sure that client-side is the same as server-side
		 * often it can be if we render desktop version in server side, but client is mobile or tablet platform
		 */
		this.$root.innerHTML = '';
		history.listen(this.historyListener);
		this.historyListener(history.getCurrentLocation(), false, false);

		// enable react hot reloading
		if (module.hot) {
			module.hot.accept('app/routes', () => {
				routes = require('app/routes').default;
				this.historyListener(history.getCurrentLocation(), true, true);
			});
		}
	}
}

export default App;
