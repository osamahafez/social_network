const validator = require('validator');
const isEmpty = require('./is-empty');

const validateProfileInput = (data) => {

    let errors = {};
    
    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;

    
    if(!validator.isLength(data.handle, {min:2, max:40})) {
        errors.handle_size = 'Handle chars should be more than 3 and less than 40';
    }
    
    if(validator.isEmpty(data.handle)) {
        errors.handle_empty = 'Please enter a handle';
    }

    if(validator.isEmpty(data.status)) {
        errors.status_empty = 'Please enter a status';
    }

    if(validator.isEmpty(data.skills)) {
        errors.skills_empty = 'Please enter skills';
    }

    if(!isEmpty(data.website) && !validator.isURL(data.website)) {
        errors.website_format = 'Not a valid URL';
    }

    if(!isEmpty(data.github) && !validator.isURL(data.github)) {
        errors.github_format = 'Not a valid URL';
    }

    if(!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
        errors.youtube_format = 'Not a valid URL';
    }

    if(!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
        errors.twitter_format = 'Not a valid URL';
    }

    if(!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
        errors.facebook_format = 'Not a valid URL';
    }

    if(!isEmpty(data.linkedin) && !validator.isURL(data.linkedin)) {
        errors.linkedin_format = 'Not a valid URL';
    }

    if(!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
        errors.instagram_format = 'Not a valid URL';
    }

    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    }
};


module.exports = validateProfileInput;