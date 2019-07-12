import axios from 'axios';


const setAuthToken = (token) => {

    // if token is found put it in the Authorization header
    if(token) {
        axios.defaults.headers.common['Authorization'] = token
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;