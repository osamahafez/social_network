import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/dashboard';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';

// I want the user to remain logged in even after refreshing the page or moving between pages
if (localStorage.jwtToken) {
    // set the token to the authorization header (the one that you find in postman)
    setAuthToken(localStorage.jwtToken);
    // decode the jwt token to get user data
    const decoded = jwt_decode(localStorage.jwtToken);
    // send the decoded data to a reducer to use the user in our components
    store.dispatch(setCurrentUser(decoded));

    // check if the token is expired
    const currentTime = Date.now() / 1000;
    if(currentTime > decoded.exp) {
        // clear profile
        store.dispatch(clearCurrentProfile());
        // logout
        store.dispatch(logoutUser());
        //redirect to login
        window.location.href = '/login';
    }
}

function App() {
    return (
        <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />

            <div className='container'>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Switch>
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />   
                </Switch>
            </div>

            <Footer />
        </div>
    );
}

export default App;
