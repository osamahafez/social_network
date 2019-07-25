import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'


class AddExperience extends Component {

    state = {
        title: '',
        description: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
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
        // CREATE ACTION TO CREATE AN EXPERIENCE
        console.log(this.state);
    } 

    currentClickHandler = () => {
        this.setState(prevState => ({
            current: !prevState.current
        }));        
    }

    render() {

        const { errors, current } = this.state;

        let toDateField;
        if(current) {
            toDateField = (
                <div>
                    <label>To</label>
                    <TextFieldGroup 
                        type='date'
                        name='to'
                        value=''
                        onChange={this.onChangeHandler}
                        disabled='disabled'
                    />
                </div>
            );
        }
        else {
            toDateField = (
                <div>
                    <label>To</label>
                    <TextFieldGroup 
                        type='date'
                        name='to'
                        value={this.state.to}
                        onChange={this.onChangeHandler}
                    />
                </div>
            );
        }


        return (
            <div className='section add-experience'>
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

                                <label>From</label>
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
                                        onClick={this.currentClickHandler}
                                    />
                                    <label className="custom-control-label" htmlFor="current">Current</label>
                                </div>

                                {toDateField}                  

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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps)(AddExperience);
