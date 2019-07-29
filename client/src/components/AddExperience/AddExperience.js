import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { withRouter } from 'react-router-dom';
import { addExperience} from '../../actions/profileAction';


class AddExperience extends Component {

    state = {
        title: '',
        description: '',
        company: '',
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
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const experienceData = {
            title: this.state.title,
            description: this.state.description,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current
        }
        
        this.props.addExperience(experienceData, this.props.history);        
    } 

    currentClickHandler = () => {
        this.setState(prevState => ({
            current: !prevState.current,
            disabled: !prevState.disabled
        }));        
    }

    render() {

        const { errors } = this.state;

        return (
            <div className='add-experience'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>
                                Add Experience
                            </h1>
                            <p className='lead text-center'>
                                Add any developer/programming positions that you
                                have had in the past
                            </p>
                            
                            <form onSubmit={this.onSubmitHandler}>
                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Job Title'
                                    name='title'
                                    value={this.state.title}
                                    info='* Required'
                                    onChange={this.onChangeHandler}
                                    error={errors.title_empty}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Company'
                                    name='company'
                                    value={this.state.company}
                                    info='* Required'
                                    onChange={this.onChangeHandler}
                                    error={errors.company_empty}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Location'
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onChangeHandler}
                                />

                                <TextAreaFieldGroup 
                                    placeholder='Job Description'
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                />

                                <label>From Date</label>
                                <TextFieldGroup 
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

                                <label>To Date</label>
                                <TextFieldGroup 
                                    type='date'
                                    name='to'
                                    value={this.state.to}
                                    onChange={this.onChangeHandler}
                                    error={errors.conflict}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />               

                                <input
                                    type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
