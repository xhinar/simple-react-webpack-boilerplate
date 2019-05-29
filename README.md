Simple React, webpack boilerplate with Ant Design
====================================

This is meant to supplement [this article](https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f) on how to customize [Ant Design](https://ant.design/docs/react/customize-theme).

## Setup

* `npm install`

* `npm start`

* `go to http://localhost:8080/`

## What's inside

````
$ tree --charset unicode
.
|-- LICENSE
|-- README.md
|-- index.html
|-- package.json
|-- fonts
|-- scripts
|   |-- index.js
|   `-- welcome-message.js
`-- webpack.config.js
````

## Customize Ant Design

Edit the less variables in `scripts/ant-theme-vars.less`.
A list of available ant theme variables can be found at [https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

Fonts have been configured to be served locally instead of the default Alibaba CDN. You can easily move the fonts to your own CDN and point the webpack `themeVariables["@icon-url"]` to your new CDN url.

Upgrade package:
1. antd:              2.11.1 => 3.18.2
2. react:             15.5.4 => 16.8.6
3. react-dom:         15.5.4 => 16.8.6
4. webpack:            2.6.1 => 4.32.2
5. webpack-dev-server: 2.4.5 => 3.4.1
6. webpack-cli:        x.x.x => 3.3.2

Turn on the CSS modules mode

## Contributors

* Forked from [Geoff Miller](https://medium.com/@geoffmiller)'s [boilerplate](https://github.com/geoffmiller/simple-react-webpack-boilerplate)
* Forked from [Yefim Vedernikoff](https://twitter.com/yefim)'s [boilerplate](https://github.com/yefim/simple-react-webpack-boilerplate)

## Links
### antd
* https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f
#### babel
* https://github.com/ant-design/babel-plugin-import/issues/266
* https://sandny.com/2018/02/26/how-to-load-antd-components-without-loading-the-whole-library/
### singlespa
* https://github.com/CanopyTax/single-spa.js.org/blob/master/docs/starting-from-scratch.md
* https://github.com/alocke12992/single-spa-starting-from-scratch
* https://github.com/me-12/single-spa-portal-example.git