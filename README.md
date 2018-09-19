##react-bootstrap

### Installation
Requirements:
- [Node@v10.3.0](https://nodejs.org/en/)

Installation:
```console
$ npm install # Install node modules
```

```console
$ npm run setupEnv #clone base env files from config/env folder, you need to update those files in app root folder if needed
```

Running production:
```console
$ npm run build
$ npm run start
```

After running your app you can find it on [http://localhost:3000/](http://localhost:3000/), as app's default port is `3000`.

Running development:
```console
$ npm run watch
```

In development mode app still available on [http://localhost:3000/](http://localhost:3000/).
But when assets will be compiled app will automatically opened in browser on [http://localhost:3002/](http://localhost:3002/) by using [browserSync](https://www.browsersync.io).
Browsersync UI is available on [http://localhost:3003/](http://localhost:3003/)

All available `npm` commands you can find in [package.json](package.json).
