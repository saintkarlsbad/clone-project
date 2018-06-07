
// function object from redux store that creates ‘store’;
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware())));