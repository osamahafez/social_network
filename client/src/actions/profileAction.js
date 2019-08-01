import axios from 'axios';
import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_CURRENT_USER,
    GET_ERRORS,
    GET_PROFILES
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

// get profile using user's handle
export const getProfileByHandle = (handle) => (dispatch) => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(() =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        );
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

// get all the profiles of developers
export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then((res) =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(() =>
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        );
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

// delete education by id
export const deleteEducation = (edu_id) => (dispatch) => {
    axios
        .delete(`/api/profile/education/${edu_id}`)
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
