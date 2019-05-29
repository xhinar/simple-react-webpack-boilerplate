const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/ant-theme-vars.less'), 'utf8'));

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
// themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont/iconfont'";

module.exports = {
  context: __dirname,
  entry: {
    // 'bundle': './src/test/welcome/index.js'
    // 'bundle': './src/single-spa.config.js'
    'bundle': './src/single-spa.portal.js'
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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //     }
      //   }]
      // },
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
      {from: path.resolve(__dirname, 'libs/system.js')},
    ]),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src', 'assets', 'css'),
      to:'css'
    }]),
    // A webpack plugin to remove/clean the build folder(s) before building
    // new CleanWebpackPlugin(['dist'])
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname,'src','assets','fonts'),
      to:'fonts'
    }])
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
		// Proxy config for development purposes. In production, you would configure you webserver to do something similar.
    proxy: {
      "/app1": {
        target: "http://localhost:8081",
        pathRewrite: {"^/app1" : ""}
      },
      "/app5": {
        target: "http://localhost:8085",
        pathRewrite: {"^/app5" : ""}
      },
    }
  }
};
