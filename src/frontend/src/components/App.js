import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//import { Provider as AlertProvider } from 'react-alert';
//import AlertTemplate from 'react-alert-template-basic';

import Nav from './nav/Nav';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import Main from './Main';


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
}, []);
	return (
		<Provider store={store}>
			<Router>
					<Nav />

					<div className="container">
						<Switch>
							<PrivateRoute
								exact
								path="/"
								component={Main}
							/>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
						</Switch>
					</div>
			</Router>
		</Provider>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
