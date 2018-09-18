import bluebird from 'bluebird';
import redis from 'redis';
import lruCache from 'lru-cache';
import api from 'app/apiRoutes';
import config from 'config';

const cache = lruCache({
	max: 500,
	maxAge: 5000 // in ms
});

// add promises to redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const state = {};
const Redis = function () {};
module.exports = Redis;

Redis.getState = function () {
	return state;
};

Redis.getClient = function () {
	if (typeof state.client === 'undefined') {
		state.connected = false;
		Redis.initClient();
	}
	return state;
};

Redis.prepareKey = function (url) {
	let path = '';
	const regExpStr = `^${api.main}$|^${api.settings}$|^(${api.albums})(/(.+))?`;
	const match = url.match(new RegExp(regExpStr));
	if (match) {
		path = `${url}`;
		return decodeURI(path);
	}
	return path;
};

Redis.initClient = function () {
	const host_conf = config.redisHost ? {host: config.redisHost} : {};
	state.client = redis.createClient({
		...host_conf,
		db: config.redisDB,
		socket_keepalive: true,
		retry_strategy: options => {
			if (options.error.code === 'ECONNREFUSED') {
				// End reconnecting on a specific error and flush all commands with a individual error
				console.log('The server refused the connection');
				return new Error('The server refused the connection');
			}
			if (options.total_retry_time > 1000 * 60 * 60) {
				// End reconnecting after a specific timeout and flush all commands with a individual error
				console.log('Retry time exhausted');
				return new Error('Retry time exhausted');
			}
			if (options.times_connected > 10) {
				// End reconnecting with built in error
				console.log('End reconnecting');
				return undefined;
			}
			// reconnect after
			console.log('reconnect after', Math.max(options.attempt * 100, 3000));
			return Math.max(options.attempt * 100, 3000);
		}
	});

	state.client.on('ready', () => {
		state.connected = true;
	});
	state.client.on('end', () => {
		state.connected = false;
	});
};

Redis.getDataFromKey = function (key) {
	return new Promise((resolve, reject) => {
		const cacheValue = cache.get(key);
		if (cacheValue) {
			try {
				return resolve(JSON.parse(cacheValue));
			} catch (err) {} // eslint-disable-line  unicorn/catch-error-name
		}
		if (!(key && state.connected)) {
			return reject();
		}
		state.client.getAsync(key).then(response => { // eslint-disable-line promise/prefer-await-to-then
			if (!response) {
				return reject();
			}
			cache.set(key, response);
			try {
				return resolve(JSON.parse(response));
			} catch (err) { // eslint-disable-line  unicorn/catch-error-name
				return reject(err);
			}
		}).catch(reject);
	});
};
