const validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = (data) => {

    let errors = {};

    data.text = isEmpty(data.text) ? '' : data.text;

    if(validator.isEmpty(data.text)) {
        errors.text_empty = 'the text field is empty';
    }

    return {
        errors: errors,
        errorsFound: !isEmpty(errors)
    }

}

module.exports = validatePostInput