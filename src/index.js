import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from './store/store';

import Connected from './components/Connected';

ReactDOM.render(
  <Provider store={reduxStore()}>
    <Router>
      <Connected />
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
