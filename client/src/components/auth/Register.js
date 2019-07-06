import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios.post('/api/users/register', newUser)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                this.setState({errors: err.response.data});
            });
    };

    render() {

        const {errors} = this.state;

        return (
            <div className='register'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Sign Up</h1>
                            <p className='lead text-center'>
                                Create your account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.name_length || errors.name_empty})}
                                        placeholder='Name'
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.name_empty} 
                                        <br/>
                                        {errors.name_length}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.email_empty || errors.email_format})}
                                        placeholder='Email Address'
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email_empty} 
                                        <br/>
                                        {errors.email_format}
                                    </div>
                                    <small className='form-text text-muted'>
                                        This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.password || errors.password_length})}
                                        placeholder='Password'
                                        name='password'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password} 
                                        <br/>
                                        {errors.password_length}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.password2 || errors.password_match})}
                                        placeholder='Confirm Password'
                                        name='password2'
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password2} 
                                        <br/>
                                        {errors.password_match}
                                    </div>
                                </div>
                                <input
                                    type='submit'
                                    value='Submit'
                                    className='btn btn-info btn-block mt-4'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
