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
            {props.error && <div className='invalid-feedback'>{props.error}</div>}
        </div>
    );
};

export default TextFieldGroup;
