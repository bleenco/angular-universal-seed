# Angular Webpack Seed

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1796022/23861990/11b1ac98-080c-11e7-8ea6-30c66633f8df.png" width="200">
</p>

---

Angular Webpack Seed and built-in `express` server with server side prerendering using `renderModuleFactory()`.

It uses `@ngtools/webpack` lib which provides full AoT support, also incremential builds for development purposes.

This seed also includes SASS/SCSS support.

### Development

Start development builds and `webpack-dev-server` using `JiT`

```sh
npm start
```

Development builds with `AoT`

```sh
npm run start:aot
```

Server Side builds

```sh
npm run build:server
```

### Watch Mode

```sh
npm run dev # wait to finish

npm run watch # watch on ./dist/server.js
```


### Production

Build both client and server side bundles and get ready for production (AoT)

```sh
npm run build:prod
```

Start the server

```sh
npm run server # or node ./dist/server.js
```

### Licence

MIT
