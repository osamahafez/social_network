import axios from 'axios';
import { GET_ERRORS, GET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post('/api/users/register', userData)
        .then(() => history.push('/login')) // redirect to the login page
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login
export const loginUser = (userData) => (dispatch) => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // fetch the token from the backend
            const { token } = res.data;
            // store the token in the local storage
            localStorage.setItem('jwtToken', token);
            // set the token to the authorization header (the one that you find in postman)
            setAuthToken(token);
            // decode the jwt token to get user data
            const decoded = jwt_decode(token);
            // send the decoded data to a reducer to use the user in our components
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// send the logged in user to a reducer to use the user in the components
export const setCurrentUser = (decoded) => {
    return {
        type: GET_CURRENT_USER,
        payload: decoded
    }
}
