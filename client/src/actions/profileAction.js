import axios from 'axios';
import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS
} from './types';

// get user's profile
export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILE,
                payload: {} // return empty object to tell the user that he didn't create a profile yet
            });
        });
};

// create user's profile
export const createProfile = (profileData, history) => (dispatch) => {
    axios
        .post('/api/profile', profileData)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// set loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

//
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
