const validator = require('validator');
const isEmpty = require('./is-empty');

const validateProfileInput = (data) => {

    data.handle = isEmpty(data.handle) ? '' : data.handle;
    
    let errors = {};

    if(validator.isEmpty(data.handle)) {
        errors.handle_empty = 'Please enter a handle';
    }

    if(!validator.isLength(data.handle, {min:3, max:40})) {
        errors.handle_size = 'Handle chars should be more than 3 and less than 40';
    }


    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    }
};


module.exports = validateProfileInput;