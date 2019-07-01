const validator = require('validator');
const isEmpty = require('./is-empty');


const validateEducationInput = (data) => {

    let errors = {};

    data.school  = isEmpty(data.school)   ? '' : data.school;
    data.degree  = isEmpty(data.degree) ? '' : data.degree;
    data.field   = isEmpty(data.field) ? '' : data.field;
    data.from    = isEmpty(data.from)    ? '' : data.from;
    data.to      = isEmpty(data.to)      ? '' : data.to;
   

    if(validator.isEmpty(data.school)) {
        errors.school_empty = 'school is required';
    }

    if(validator.isEmpty(data.degree)) {
        errors.degree_empty = 'degree is required';
    }

    if(validator.isEmpty(data.field)) {
        errors.field_empty = 'Field is required';
    }
    
    if(validator.isEmpty(data.from)) {
        errors.from_empty = 'the "from" field is required';
    }

    if(validator.isEmpty(data.to)){  
        if(data.current == 'false') {
            errors.conflict = 'specifiy the end date of the school or select current';
        }
    } 
        
    if(!validator.isEmpty(data.to)) {
        if(data.current == 'true') {
            errors.conflict = 'specifiy the end date of the school or select current not both';
        }
    }


    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    }
}

module.exports = validateEducationInput;