# Angular5 Universal Webpack Seed

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1796022/23861990/11b1ac98-080c-11e7-8ea6-30c66633f8df.png" width="200">
</p>

---

Angular Webpack Seed and built-in `express` server with server side prerendering using `renderModuleFactory()`.

It uses `@ngtools/webpack` lib which provides full AoT support, also incremential builds for development purposes.

This seed also includes SASS/SCSS support.

### Development

```sh
npm run start
```

### Production

Build both client and server side bundles and get ready for production (AoT)

```sh
npm run build:prod
```

Start the server

```sh
node ./dist/server.js
```

### Licence

MIT
