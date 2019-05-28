const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/ant-theme-vars.less'), 'utf8'));

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont'";

module.exports = {
  context: __dirname,
  entry: {
    // 'bundle': './src/test/welcome/index.js'
    'bundle': './src/single-spa.config.js'
  },
  output: {
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader", options: {modules: true}},
          {loader: "less-loader"}
        ]
      },
      {
        test: /\.less$/,
        exclude: /antd.*\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader",
            options: {
              modules: true
            }
          },
          {loader: "less-loader"},
        ]
      },
      {
        test: /antd.*\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, './')
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        // This plugin will allow us to use html templates when we get to the angularJS app
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src/index.html')},
    ]),
    // A webpack plugin to remove/clean the build folder(s) before building
    // new CleanWebpackPlugin(['dist'])
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    }),

  ],
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};
