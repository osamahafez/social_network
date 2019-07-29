import axios from 'axios';
import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_CURRENT_USER,
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

// Add experience to user's profile
export const addExperience = (experienceData, history) => (dispatch) => {
    axios
        .post('/api/profile/experience', experienceData)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Add education to user's profile
export const addEducation = (educationData, history) => (dispatch) => {
    axios
        .post('/api/profile/education', educationData)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// delete user and profile data
export const deleteAccount = () => (dispatch) => {
    axios
        .delete('/api/profile')
        .then((res) => {
            dispatch({
                type: GET_CURRENT_USER,
                payload: {}
            });
        })
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

// delete expreience by id
export const deleteExperience = (exp_id) => (dispatch) => {
    axios
        .delete(`/api/profile/experience/${exp_id}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
