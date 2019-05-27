const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './scr/themes/ant-theme-vars.less'), 'utf8'));

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont'";

module.exports = {
  context: __dirname,
  entry: './scr/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './')
  },
  resolve: {
    modules: ['scr', 'node_modules'],
    extensions: ['.js', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: [
            ['env', {modules: false, targets: {browsers: ['last 2 versions']}}],
            'react'
          ],
          cacheDirectory: true,
          plugins: [
            ['import', { libraryName: "antd", style: true }],
            'transform-strict-mode',
            'transform-object-rest-spread'
          ]
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
      }
    ]
  },
};
