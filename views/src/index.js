import React from 'react';
import { render } from 'react-dom';
import App from './components/Routes';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.js';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

const cs = composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
const store = cs(reducers);

render(
  <Provider store={store}>
    <App />
  </Provider>,
	document.getElementById('root')
);
registerServiceWorker();
