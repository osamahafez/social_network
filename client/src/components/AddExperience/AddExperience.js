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

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = (e) => {
        console.log(this.state);
    } 

    render() {

        const { errors } = this.state;

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

                              
            {/* zabat el onClick aw onChange */}
                                <div className="form-check mb-2">
                                    <label className="form-check-label">
                                        <input 
                                            type="radio" 
                                            className="form-check-input" 
                                            name="current"
                                            value={this.state.current}
                                        />Current
                                    </label>
                                </div>

                                <label>To</label>
                                <TextFieldGroup 
                                    type='date'
                                    name='to'
                                    value={this.state.to}
                                    onChange={this.onChangeHandler}
                                />                    


                                {/* <div class='form-group'>
                                    <input
                                        type='text'
                                        class='form-control form-control-lg'
                                        placeholder='* Job Title'
                                        name='title'
                                        required
                                    />
                                </div>
                                <div class='form-group'>
                                    <input
                                        type='text'
                                        class='form-control form-control-lg'
                                        placeholder='* Company'
                                        name='company'
                                        required
                                    />
                                </div>
                                <div class='form-group'>
                                    <input
                                        type='text'
                                        class='form-control form-control-lg'
                                        placeholder='Location'
                                        name='location'
                                    />
                                </div>
                                <h6>From Date</h6>
                                <div class='form-group'>
                                    <input
                                        type='date'
                                        class='form-control form-control-lg'
                                        name='from'
                                    />
                                </div>
                                <h6>To Date</h6>
                                <div class='form-group'>
                                    <input
                                        type='date'
                                        class='form-control form-control-lg'
                                        name='to'
                                    />
                                </div>
                                <div class='form-check mb-4'>
                                    <input
                                        class='form-check-input'
                                        type='checkbox'
                                        name='current'
                                        value=''
                                        id='current'
                                    />
                                    <label
                                        class='form-check-label'
                                        for='current'
                                    >
                                        Current Job
                                    </label>
                                </div>
                                <div class='form-group'>
                                    <textarea
                                        class='form-control form-control-lg'
                                        placeholder='Job Description'
                                        name='description'
                                    />
                                    <small class='form-text text-muted'>
                                        Some of your responsabilities, etc
                                    </small>
                                </div> */}
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
