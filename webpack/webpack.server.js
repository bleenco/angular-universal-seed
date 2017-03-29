const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: root('./src/main.server.ts'),
  output: {
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()]
};
