//
// node && node-related modules
// -----------------------------------------------------------------------------
import path from 'path';
import http from 'http';
import url from 'url';
import fs from 'mz/fs';
import PrettyError from 'pretty-error';
//
// Express and middleware modules
// -----------------------------------------------------------------------------
import Express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
// import basicAuth from 'express-basic-auth';
import morgan from 'morgan';
import engine from 'express-dot-engine';
//
// react && react related modules
// -----------------------------------------------------------------------------
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import Root from 'Roots/Root'; // eslint-disable-line import/order
import Helmet from 'react-helmet';
import ErrorPage from 'app/Pages/ErrorPage'; // eslint-disable-line import/order
//
// redux && redux related modules
// -----------------------------------------------------------------------------
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {actions as commonActions} from 'reducers/common'; // eslint-disable-line import/order
//
// data fetching modules
// -----------------------------------------------------------------------------
import trigger from 'redial/lib/trigger';
//
// utils modules
// -----------------------------------------------------------------------------
import {safeGet} from 'utils/safeGet';
import fetch from 'utils/fetch';
//
// application modules
// -----------------------------------------------------------------------------
import reducers from 'reducers';
import routes from 'app/routes';
import {host, port, analytics, meta} from 'config';

const isProduction = process.env.NODE_ENV === 'production';

const app = new Express();
const server = new http.Server(app);
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Read assets file for production
// -----------------------------------------------------------------------------
let productionAssets = null;
if (isProduction) {
	try {
		productionAssets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'public', 'assets', 'assets.json'), {encoding: 'utf8'}));
	} catch (err) { // eslint-disable-line  unicorn/catch-error-name
		throw (err);
	}
}

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
if (isProduction) {
	// app.use(basicAuth({
	// 	users: {prince_discography: 'hSX43afpLWJNToNn'},
	// 	unauthorizedResponse: {
	// 		message: 'Bad credentials'
	// 	},
	// 	challenge: true
	// }));
	app.use(compression());
}

app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')));
app.use('/public', Express.static(path.join(__dirname, '..', '..', 'public')));

//
// Register log middleware
// -----------------------------------------------------------------------------
app.use(isProduction ? morgan('combined') : morgan('dev'));

//
// Register template engine https://www.npmjs.com/package/express-dot-engine and template directory
// -----------------------------------------------------------------------------
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'templates/'));
app.set('view engine', 'dot');

// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
	try {
		const assets = productionAssets || JSON.parse(await fs.readFile(path.resolve(__dirname, '..', '..', 'public', 'assets', 'assets.json'), {encoding: 'utf8'}));
		const store = applyMiddleware(thunkMiddleware)(createStore)(combineReducers(reducers));
		store.dispatch(commonActions.isMobile(req.headers['user-agent']));
		const props = await (new Promise((resolve, reject) =>
			match({routes, location: req.url}, (err, redirect, props) => {
				if (err) {
					console.error(`Router error ${err}`);
					const error = new Error(err);
					error.status = 500;
					reject(error);
				} else if (redirect) {
					resolve({type: 'redirect', redirect});
				} else if (props) {
					resolve(props);
				} else {
					const error = new Error('Route not found');
					error.status = 404;
					reject(error);
				}
			})));

		if (props.type === 'redirect') {
			return res.redirect(url.format(props.redirect));
		}

		// prefetch all necessary data from api
		try {
			await trigger('fetch', props.components, {
				dispatch: store.dispatch,
				...props
			});
		} catch (err) { // eslint-disable-line  unicorn/catch-error-name
			await fetch.handleErrors(err);
		}

		const html = renderToString(
			<Root store={store}>
				<RouterContext {...props}/>
			</Root>
		);
		const state = store.getState();
		const {settings, seo: storeSEO} = state;
		const helmet = Helmet.renderStatic();
		const title = helmet.title.toString().replace('<title data-react-helmet="true">', '').replace('</title>', '');
		// TODO need to correct path to description and for image
		const description = safeGet(settings, 'share.description', ''); // get default description from settings
		const image = safeGet(settings, 'share.image', ''); // get default image from settings
		const seo = {...{description, image}, ...storeSEO, title};
		res.render('index', {
			...meta,
			appAssets: assets.app,
			seo,
			url: req.url,
			state: encodeURIComponent(JSON.stringify(state)),
			body: html,
			trackingId: analytics.google.trackingId,
			isProduction
		});
	} catch (err) { // eslint-disable-line  unicorn/catch-error-name
		next(err);
	}
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use(async (err, req, res) => { // eslint-disable-line  require-await
	console.log(pe.render((err && err.status) ? err.status : err)); // eslint-disable-line no-console
	const status = err.status || 500;
	let assets = productionAssets;
	let store = {};
	let html = status;
	try {
		assets = assets || JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'public', 'assets', 'assets.json'), {encoding: 'utf8'}));
		store = applyMiddleware(thunkMiddleware)(createStore)(combineReducers(reducers));
		store.dispatch(commonActions.isMobile(req.headers['user-agent']));
		html = renderToStaticMarkup(
			<Root store={store}>
				<ErrorPage pure_page status={status}/>
			</Root>
		);
	} catch (err) {} // eslint-disable-line  unicorn/catch-error-name

	const helmet = Helmet.renderStatic();
	const title = helmet.title.toString().replace('<title data-react-helmet="true">', '').replace('</title>', '');
	const seo = {title};

	res.status(status);
	res.render('error', {
		...meta,
		status,
		seo,
		url: seo.pathname || req.url,
		body: html,
		state: encodeURIComponent(JSON.stringify({serverError: true})),
		appAssets: assets.app
	});
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (port) {
	server.listen(port, err => {
		if (err) {
			console.error(err);
		}
		console.info('==> Open http://%s:%s in a browser to view the app.', host, port);
	});
} else {
	console.error('==> ERROR: No PORT environment variable has been specified');
}
