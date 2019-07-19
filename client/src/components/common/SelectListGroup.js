import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = (props) => {

    const selectOptions = props.options.map(option => {
        return (
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        );
    })

    return (
        <div className='form-group'>
            <select
                className={classNames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            >
                {selectOptions}
            </select>

            <small className='form-text text-muted'>{props.info}</small>
            <div className='invalid-feedback'>{props.error}</div>
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectListGroup;
