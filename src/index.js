import React from "react";
import ReactDOM from "react-dom";
import NextApp from './NextApp';
// Add this import:

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <Component/>,
    document.getElementById('root')
  );
};

// Do this once

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
