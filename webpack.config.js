var path = require('path');

module.exports = {
  entry: './app/index.ts',
  output: {
    filename: './app/index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
}