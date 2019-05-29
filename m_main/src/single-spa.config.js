
import { registerApplication, start } from 'single-spa';

registerApplication('navBar', () => import('./test/sspadiv/navBar/navBar.app.js').then(mod => mod.navBar), () => true);
registerApplication('home', () => import('./test/sspadiv/home/home.app.js'), (location) => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));
registerApplication('antd', () => import('./test/sspadiv/antd/antd.app.js'), pathPrefix('/antd'));


start();

function pathPrefix(prefix) {
  return function (location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}
