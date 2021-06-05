import React from 'react';
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import './styles/index.scss';
import { RecoilRoot } from 'recoil'
import App from './App';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import { CookiesProvider } from "react-cookie";

import reducers from './redux/reducers'
import sagas from './redux/sagas'
import { routerMiddleware } from "connected-react-router";

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middleware = [sagaMiddleware, routeMiddleware];
if (process.env.NODE_ENV !== 'production') {
  //middleware.push(logger)
}
const store = createStore(reducers(history), compose(applyMiddleware(...middleware)));
sagaMiddleware.run(sagas);

ReactDOM.render(
  <RecoilRoot>
    <CookiesProvider>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </CookiesProvider>
  </RecoilRoot>,
  document.getElementById('root')
);

serviceWorker.unregister();
export { store, history }
