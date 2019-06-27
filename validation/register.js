const validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = (data) => {
    
    let errors = {};

    // lw el field empty ba7welo le empty string
    data.name       = isEmpty(data.name)      ? '' : data.name;
    data.email      = isEmpty(data.email)     ? '' : data.email;
    data.password   = isEmpty(data.password)  ? '' : data.password;
    data.password2  = isEmpty(data.password2) ? '' : data.password2;


    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name_length = 'Name length must be between 2 and 30 charachers';
    }

    if(validator.isEmpty(data.name)) {
        errors.name_empty = 'Name field is required';
    }

    if(validator.isEmpty(data.email)) {
        errors.email_empty = 'Email field is required';
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(validator.isEmpty(data.password2)) {
        errors.password2 = 'Password confirmation field is required';
    }

    if(!validator.isEmail(data.email)) {
        errors.email_format = 'Email format is not correct';
    }
    
    if(!validator.isLength(data.password, {min:6, max:30})) {
        errors.password_length = 'Password need to be 6 characters at least and 30 characters at most';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password_match = 'Passwords don\'t match';
    }

    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    };
};

module.exports = validateRegisterInput;
