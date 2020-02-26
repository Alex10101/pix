import { createStore } from 'redux';
import reducers from './reducers';

const store = (initialState) => createStore(reducers, initialState);

export default store;
