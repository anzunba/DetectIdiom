import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//import { Provider as AlertProvider } from 'react-alert';
//import AlertTemplate from 'react-alert-template-basic';

import Header from './nav/Header';
import Dashboard from './feed/Dashboard';
import Edit from './edit/Edit';
import Profile from './users/profile/Profile';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

const App = () => {
  const [page, setPage] = useState('home')
const callback = (page) => {
  setPage(page)
}
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
    return (
      <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...alertOptions}> */}
          <Router>
            <Fragment>
              <Header parentCallback={callback}/>
              {/* <Alerts /> */}
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={page=='home'? Dashboard : page=='edit' ? Edit: Profile} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
     {/* </AlertProvider> */}
    </Provider>
    );

}

ReactDOM.render(<App />, document.getElementById('app'));