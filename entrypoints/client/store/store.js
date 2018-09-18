import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import reducers from 'reducers';

/**
 * Redux store configure
 * @param {Object} initialState
 * @return {Object} store
 */

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk)
);

const configureStore = initialState => {
	const store = createStore(
		combineReducers(reducers),
		initialState,
		enhancer
	);

	// Hot reload reducers
	if (module.hot) {
		module.hot.accept(
			'reducers',
			() => store.replaceReducer(combineReducers(require('reducers').default))
		);
	}

	return store;
};

export default configureStore;
