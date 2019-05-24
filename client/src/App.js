//Local, Node_Modules
import './App.css';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components, Layouts
import { Layout } from 'antd';
import Navigationbar from './components/layout/Navigationbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Account from './components/Account';
import UserAccount from './components/layout/UserAccount';
import Notifications from './components/layout/Notifications';
//POST, PATCH, etc...
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TripForm from './components/Trip/TripFormBasic';

const { Header, Footer, Sider, Content} = Layout;

// Check for token to keep user logged in
if(localStorage.jwtToken){
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); 

    //Redirect user to login
    window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Layout>
            <Content />
          </Layout>
          <Navigationbar />
          <Route exact path ="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/notifications" component={Notifications } />
          <Route path="/user/:username" component={UserAccount} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/trips/add" component={TripForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
