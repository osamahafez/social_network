import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profileAction';

class AddEducation extends Component {

    state = {
        school: '',
        degree: '',
        field: '',
        location: '',
        from: '',
        to: '',
        current: false,
        disabled: false,
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const educationData = {
            school: this.state.school,
            degree: this.state.degree,
            field: this.state.field,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current
        }

        this.props.addEducation(educationData, this.props.history);
    }

    currentClickHandler = () => {
        this.setState(prevState => ({
            current: !prevState.current,
            disabled: !prevState.disabled
        }))
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                      
                        <h1 className="display-4 text-center">Education</h1>
                        <p className='lead text-center'>
                                Add any education that you
                                have had in the past
                            </p>
                        <form onSubmit={this.onSubmitHandler}>
                            <TextFieldGroup 
                                type='text'
                                placeholder='School'
                                name='school'
                                value={this.state.school}
                                info='* Required'
                                onChange={this.onChangeHandler}
                                error={errors.school_empty}
                            />

                            <TextFieldGroup 
                                type='text'
                                placeholder='Degree'
                                name='degree'
                                value={this.state.degree}
                                info='* Required'
                                onChange={this.onChangeHandler}
                                error={errors.degree_empty}
                            />

                            <TextFieldGroup 
                                type='text'
                                placeholder='Field'
                                name='field'
                                value={this.state.field}
                                info='* Required'
                                onChange={this.onChangeHandler}
                                error={errors.field_empty}
                            />

                            <TextFieldGroup 
                                type='text'
                                placeholder='Location'
                                name='location'
                                value={this.state.location}
                                onChange={this.onChangeHandler}
                            />

                            <label htmlFor="from">From Date</label>
                            <TextFieldGroup 
                                id='from'
                                type='date'
                                name='from'
                                value={this.state.from}
                                info='* Required'
                                onChange={this.onChangeHandler}
                                error={errors.from_empty}
                            />

                            <div className="custom-control custom-checkbox mb-3">
                                <input 
                                    type="checkbox" 
                                    className="custom-control-input" 
                                    id="current" 
                                    name='current'
                                    value={this.state.current}
                                    checked={this.state.current}    
                                    onChange={this.currentClickHandler}
                                />
                                <label className="custom-control-label" htmlFor="current">Current</label>
                            </div>

                            <label htmlFor="to">To Date</label>
                            <TextFieldGroup 
                                id='to'
                                type='date'
                                name='to'
                                value={this.state.to}
                                onChange={this.onChangeHandler}
                                disabled={this.state.disabled ? 'disabled':''}
                                error={errors.conflict}
                            />

                            <input type="submit" value='Add Education' className="btn btn-primary btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

AddEducation.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));