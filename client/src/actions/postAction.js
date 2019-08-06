import axios from 'axios';
import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    DELETE_POST,
    POST_LOADING,
    GET_POST,
    CLEAR_ERRORS
} from './types';

// create a new post
export const addPost = (postData) => (dispatch) => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then((res) =>
            dispatch({
                type: ADD_POST,
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

// Add a new comment
export const addComment = (commentData, post_id) => (dispatch) => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${post_id}`, commentData)
        .then((res) =>
            dispatch({
                type: GET_POST,
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

// get all the posts
export const getPosts = () => (dispatch) => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then((res) =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(() =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

// get a post by id
export const getPost = (post_id) => (dispatch) => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${post_id}`)
        .then((res) =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(() =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};

// like a post
export const likePost = (post_id) => (dispatch) => {
    axios
        .post(`/api/posts/like/${post_id}`)
        .then(() => dispatch(getPosts()))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// unlike a post
export const unlikePost = (post_id) => (dispatch) => {
    axios
        .post(`/api/posts/unlike/${post_id}`)
        .then(() => dispatch(getPosts()))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//delete a post by id
export const deletePost = (post_id) => (dispatch) => {
    axios
        .delete(`/api/posts/${post_id}`)
        .then(() =>
            dispatch({
                type: DELETE_POST,
                payload: post_id
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// delete a comment
export const deleteComment = (commentId, postId) => (dispatch) => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then((res) =>
            dispatch({
                type: GET_POST,
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

// loading
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};

// clear erros
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
