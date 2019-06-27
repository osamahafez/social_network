const validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = (data) => {

    let errors = {};

    data.email    = isEmpty(data.email)    ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    if(validator.isEmpty(data.email)) {
        errors.email_empty = 'Email field is required';
    }

    if(!validator.isEmail(data.email)) {
        errors.email_format = 'Email format is incorrect';
    }

    if(validator.isEmpty(data.password)) {
        errors.password_empty = 'Password field is required';
    }

    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    };
}

module.exports = validateLoginInput;