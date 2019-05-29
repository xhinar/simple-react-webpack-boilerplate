import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './root.component.js';

export const navBar = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
  domElementGetter,
  suppressComponentDidCatchWarning: true
  //https://reactjs.org/docs/hooks-faq.html
  // - componentDidCatch and getDerivedStateFromError:
  //   There are no Hook equivalents for these methods yet, but they will be added soon.
})

// Finally, we specify the location we want single-spa to mount our application
function domElementGetter() {
  return document.getElementById("navBar")
}

// function domElementGetter() {
// 	// Make sure there is a div for us to render into
// 	let el = document.getElementById('navBar');
// 	if (!el) {
// 		el = document.createElement('div');
// 		el.id = 'navBar';
// 		document.body.appendChild(el);
// 	}

// 	return el;
// }