import App from './app';

require('raf').polyfill();

const app = new App();
app.start();
