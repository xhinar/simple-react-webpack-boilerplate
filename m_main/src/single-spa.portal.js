import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

function pathPrefix(prefix) {
  return function (location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}

async function init() {
  const globalEventDistributor = new GlobalEventDistributor();
  const loadingPromises = [];

  singleSpa.registerApplication('navBar', () => import('./test/sspadiv/navBar/navBar.app.js').then(mod => mod.navBar), () => true);
  singleSpa.registerApplication('home', () => import('./test/sspadiv/home/home.app.js'), (location) => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));
  singleSpa.registerApplication('antd', () => import('./test/sspadiv/antd/antd.app.js'), pathPrefix('/antd'));

  // app1: The URL "/app1/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
  loadingPromises.push(loadApp('app1', '/app1', '/app1/singleSpaEntry.js', '/app1/store.js', globalEventDistributor));

  // app5: The URL "/app5/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
  loadingPromises.push(loadApp('app5', '/app5', '/app5/singleSpaEntry.js', '/app5/store.js', globalEventDistributor));

  // wait until all stores are loaded and all apps are registered with singleSpa
  await Promise.all(loadingPromises);

  singleSpa.start();
}

init();

