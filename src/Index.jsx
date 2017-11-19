import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import './base.less';
import RouteTest from './components/RouteTest/Index';
import App from './containers/App/Index';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/:id' component={RouteTest} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
