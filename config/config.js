module.exports = {
	locales: [],
	port: process.env.NODE_PORT || 3000,
	host: process.env.HOSTNAME || 'localhost',
	webpackPort: 3001, // webpack dev server
	apiProtocol: process.env.API_PROTOCOL || 'http',
	apiHost: process.env.API_ROOT || 'localhost',
	apiPort: process.env.API_PORT || '',
	basicAuth: process.env.BASIC_AUTH || '',
	enableApiMocks: process.env.ENABLE_API_MOCKS === 'true' || false,
	browserSyncUIPort: 3003,
	browserSyncPort: 3002,
	redisHost: process.env.REDIS_HOST || '',
	redisDB: process.env.REDIS_DB || 0,
	meta: {
		domain_name: 'https://domainname.com',
		sitename: 'localhost'
	},
	analytics: {
		// https://analytics.google.com/
		google: {
			trackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
		}
	}
};
