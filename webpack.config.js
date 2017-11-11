const { resolve } = require('path');
const { AngularCompilerPlugin, PLATFORM } = require('@ngtools/webpack');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const compression = require('compression-webpack-plugin');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const portfinder = require('portfinder');
const nodeModules = resolve(__dirname, 'node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "app"];

module.exports = function (options, webpackOptions) {
  options = options || {};

  let config = {};
  let entry = {};

  if (webpackOptions.p) {
    entry = { app: root('src/main.prod.ts') };
  } else {
    entry = { app: root('src/main.ts') };
  }

  config = webpackMerge({}, config, {
    entry: entry,
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: ['node_modules', nodeModules]
    },
    resolveLoader: {
      modules: [nodeModules, 'node_modules']
    },
    module: {
      rules: [
        { test: /\.html$/, loader: 'html-loader', options: { minimize: true, removeAttributeQuotes: false, caseSensitive: true, customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ], customAttrAssign: [ /\)?\]?=/ ] } },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'images/[hash].[ext]' } },
        { test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'fonts/[hash].[ext]' } }
      ]
    },
    plugins: [
      new copy([
        { context: './src/assets', from: '**/*' }
      ]),
    ],
    stats: 'minimal'
  });

  config = webpackMerge({}, config, {
    output: {
      path: root('dist/browser'),
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[id].chunk.js'
    },
    devServer: {
      historyApiFallback: true,
      port: 8000,
      open: true,
      hot: false,
      inline: true,
      overlay: true,
      stats: 'minimal',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  });

  config = webpackMerge({}, config, {
    plugins: [
      new html({
        template: root('src/index.html'),
        output: !options.server ? root('dist/browser') : root('dist/server'),
        chunksSortMode: sort = (left, right) => {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          } else if (leftIndex < rightindex) {
            return -1;
          } else {
            return 0;
          }
        }
      })
    ]
  });

  if (webpackOptions.p) {
    config = webpackMerge({}, config, getProductionPlugins());
  } else {
    config = webpackMerge({}, config, getDevelopmentConfig());
  }

  config = webpackMerge({}, config, stylesConfig());

  config = webpackMerge({}, config, {
    module: {
      rules: [{ test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, loader: '@ngtools/webpack' }]
    },
    plugins: [
      new AngularCompilerPlugin({
        tsConfigPath: 'src/tsconfig.client.json'
      })
    ]
  });

  if (options.serve) {
    return portfinder.getPortPromise().then(port => {
      config.devServer.port = port;
      return config;
    });
  } else {
    return Promise.resolve(config);
  }
}

function root(path) {
  return resolve(__dirname, path);
}

function getDevelopmentConfig() {
  return {
    devtool: 'inline-source-map',
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['app'],
        minChunks: module => {
          return module.resource && module.resource.startsWith(nodeModules)
        }
      })
    ]
  };
}

function getProductionPlugins() {
  return {
    plugins: [
      new compression({ asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$|\.html$/, threshold: 10240, minRatio: 0.8 })
    ]
  };
}

function stylesConfig() {
  return {
    plugins: [
      new extract('css/[hash].css')
    ],
    module: {
      rules: [
        { test: /\.css$/, use: extract.extract({ fallback: 'style-loader', use: 'css-loader' }), include: [root('src/styles')] },
        { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
        { test: /\.scss$|\.sass$/, loader: extract.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }), exclude: [root('src/app/components'), root('node_modules')] },
        { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'css-loader', 'sass-loader'], include: [root('src/app/components')] }
      ]
    }
  };
}
