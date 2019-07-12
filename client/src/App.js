import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Route } from 'react-router-dom';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

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
            </div>

            <Footer />
        </div>
    );
}

export default App;
