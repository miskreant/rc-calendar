var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var cwd = process.cwd();
var pkg = require(path.join(cwd, 'package.json'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  new ExtractTextPlugin("calendar.css")
];

var entry = {
  js: path.join(__dirname, './index.js'),
  css: path.join(__dirname, './assets/index.less')
}

function getResolve() {
  var alias = {};
  var resolve = {
    root: cwd,
    extensions: ['', '.js', '.jsx'],
    alias: alias,
  };
  var name = pkg.name;
  alias[name + '$'] = path.join(cwd, 'index.js');
  alias[name] = cwd;
  return resolve;
};

module.exports = {
  entry: entry,
  resolve: getResolve(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader!less?sourceMap')
      }
    ],
  },
  output: {
    library: 'Calendar',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'calendar.js',
  },
  // This is key. https://gist.github.com/STRML/2117f574726bdf0b8d58
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },

  node: {
    Buffer: false
  },

  plugins: plugins
};
