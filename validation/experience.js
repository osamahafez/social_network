const validator = require('validator');
const isEmpty = require('./is-empty');


const validateExperienceInput = (data) => {

    let errors = {};

    data.title   = isEmpty(data.title)   ? '' : data.title;
    data.company = isEmpty(data.company) ? '' : data.company;
    data.from    = isEmpty(data.from)    ? '' : data.from;
    data.to      = isEmpty(data.to)      ? '' : data.to;
   

    if(validator.isEmpty(data.title)) {
        errors.title_empty = 'Job title is required';
    }

    if(validator.isEmpty(data.company)) {
        errors.company_empty = 'Company field is required';
    }
    
    if(validator.isEmpty(data.from)) {
        errors.from_empty = 'the "from" field is required';
    }

    if(validator.isEmpty(data.to)){  
        if(data.current == false) {
            errors.conflict = 'specifiy the end date of the job or select current';
        }
    } 
        
    if(!validator.isEmpty(data.to)) {
        if(data.current == true) {
            errors.conflict = 'specifiy the end date of the job or select current not both';
        }
    }


    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    }
}

module.exports = validateExperienceInput;