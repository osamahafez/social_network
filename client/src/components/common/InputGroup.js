import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text"> <i className={props.icon} /></span>
            </div>
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
            <div className='invalid-feedback'>{props.error}</div>
        </div>
    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;
