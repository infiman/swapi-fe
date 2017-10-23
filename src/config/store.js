import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import thunk from 'redux-thunk';

import reducers from '../ducks';

const history = process.env.SERVER ? createMemoryHistory() : createBrowserHistory();
const router = routerMiddleware(history);
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  compose;
const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  typeof window === 'object' && window.__STATE__ ?
    // eslint-disable-next-line no-underscore-dangle
    JSON.parse(window.__STATE__) :
    {},
  composeEnhancers(
    applyMiddleware(
      thunk,
      router,
    ),
  ),
);

if (typeof window === 'object') {
  // eslint-disable-next-line no-underscore-dangle
  delete window.__STATE__;
}

export {
  store,
  history,
};