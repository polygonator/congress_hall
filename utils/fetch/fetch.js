import url from 'url';
import safeGet from 'lodash/get';
import superagent from 'superagent';
import mapValues from 'lodash/mapValues';
import superAgentPrefix from 'superagent-prefix';
import config from 'config';

let redis = null;

if (config.enableApiMocks) {
	const mocker = require('./mocker').default;
	mocker(superagent);
}

const prefixString = url.format({
	protocol: config.apiProtocol,
	hostname: config.apiHost,
	port: config.apiPort
});
const prefix = superAgentPrefix(prefixString);

if (!__BROWSER__) { // eslint-disable-line no-undef
	redis = require('entrypoints/server/redis');
}

const redisMiddleware = (path, params, headers, getRequestPromise) => new Promise(resolve => {
	const key = redis.prepareKey(path);
	return redis.getDataFromKey(key).then(resolve).catch(() => { // eslint-disable-line promise/prefer-await-to-then
		return resolve(getRequestPromise());
	});
});

function generateMethod(method, path, {params, data, form, json, headers} = {}) {
	const getRequestPromise = () => new Promise((resolve, reject) => {
		const request = superagent[method](path).use(prefix);
		const newHeaders = headers || {};

		if (config.basicAuth) {
			newHeaders.Authorization = `Basic ${config.basicAuth}`;
		}

		if (params) {
			request.query(params);
		}

		if (data) {
			request.send(data);
		}

		if (json) {
			request.type('json');
		}

		if (form) {
			request.type('form');
		}

		if (newHeaders) {
			request.set(mapValues(newHeaders, str => String(str || '').trim()));
		}

		request.end((err, resp = {}) => {
			const body = safeGet(resp, 'body') || safeGet(err, 'response');
			const status = safeGet(resp, 'statusCode');
			return err ? reject({body, err, status}) : resolve(body); // eslint-disable-line prefer-promise-reject-errors
		});
	});
	if (!__BROWSER__) { // eslint-disable-line no-undef
		return redisMiddleware(path, params, headers, getRequestPromise);
	}
	return getRequestPromise();
}

function handleErrors(errs = {}) {
	if (process.env.NODE_ENV !== 'production') {
		console.log('handleErrors', errs, safeGet(errs, 'err.response.request.url'));
	}
	const status = safeGet(errs, 'err.status');
	return Promise.reject({status: status ? status : 500}); // eslint-disable-line prefer-promise-reject-errors
}

export default {
	get: (path, data) => generateMethod('get', path, data),
	post: (path, data) => generateMethod('post', path, data),
	put: (path, data) => generateMethod('put', path, data),
	patch: (path, data) => generateMethod('patch', path, data),
	del: (path, data) => generateMethod('del', path, data),
	handleErrors: (...args) => handleErrors(...args)
};
