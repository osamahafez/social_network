import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = (props) => {
    return (
        <div className='form-group'>
            <textarea
                className={classNames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            <small className='form-text text-muted'>{props.info}</small>
            <div className='invalid-feedback'>{props.error}</div>
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
