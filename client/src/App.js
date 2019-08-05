import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';
import EditProfile from './components/EditProfile/EditProfile';
import AddExperience from './components/AddExperience/AddExperience';
import AddEducation from './components/AddEducation/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';
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
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:handle' component={Profile} />
                <Switch>
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />   
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/add-experience' component={AddExperience} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/add-education' component={AddEducation} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/feed' component={Posts} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path='/post/:post_id' component={Post} />
                </Switch>
                <Route exact path='/not-found' component={NotFound} />
            </div>

            <Footer />
        </div>
    );
}

export default App;
