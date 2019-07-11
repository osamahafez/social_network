import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';

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

        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
