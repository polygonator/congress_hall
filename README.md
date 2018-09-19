##react-bootstrap
> Charmer Admin App

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Table of contents
- [Setup](#Setup)
- [Installation](#installation)
- [Enviroment](#enviroment)
- [Deploy](#deploy)

### Setup
## Fonts
Put your fonts into `app/fonts` and attach them in `app/root.css`
## Routes
Update `app/routes.js` according your route structure

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

### Enviroment
| Variable  | Default                           | Definition                              |
|-----------|-----------------------------------|-----------------------------------------|
| NODE_ENV  | development                       | Application's enviroment                |
| NODE_PORT | 3000                              | Port to listen                          |
| NODE_PATH | $PWD:$PWD/app                     | Paths to lookup application's modules   |
| API_PORT  | 3000                              | port for API entrypoint (can be missed) |
| API_ROOT  | localhost                         | hostname for API entrypoint             |
| API_HTTP  | true                              | use http protocol for API entrypoint    |

### Test
We provide precommit-hook via [pre-commit](https://github.com/observing/pre-commit) package, so when you do `$ git commit` test command will invoke. If it fails commit will be rejected, so beware.

**Note**: You can skip commit verifying, by running `git commit --no-verify`, but it's strongly unrecommended.

**Note**: For simple fixes for xo eslint you can use:
```console
$ npm run xoFix
```

### Deploy
