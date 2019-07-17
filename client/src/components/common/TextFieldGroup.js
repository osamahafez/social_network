import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = (props) => {
    return (
        <div className='form-group'>
            <input
                type={props.type}
                className={classNames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                disabled={props.disabled}
                onChange={props.onChange}
            />
            <small className='form-text text-muted'>{props.info}</small>
            <div className='invalid-feedback'>{props.error}</div>
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
