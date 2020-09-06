import React          from 'react';
import ReactDOM       from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Info            from './info';

ReactDOM.render(
  <HashRouter>
    <Info />
  </HashRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}