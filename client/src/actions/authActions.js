import axios from 'axios';
import { GET_ERRORS } from './types';

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
