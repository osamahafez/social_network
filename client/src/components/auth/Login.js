import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'


class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {

        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {

        const { errors } = this.state;

        return (
            <div className='login'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>                           
                            <h1 className='display-4 text-center'>Log In</h1>
                            <p className='lead text-center'>
                                Sign in to your account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.email_empty || errors.email_format || errors.email})} 
                                        placeholder='Email Address'
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <div className='invalid-feedback'>
                                        {errors.email_empty}
                                        <br/>
                                        {errors.email_format}
                                        <br/>
                                        {errors.email}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className={classNames('form-control form-control-lg', {'is-invalid': errors.password || errors.password_empty})}
                                        placeholder='Password'
                                        name='password'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className='invalid-feedback'>
                                        {errors.password}
                                        <br/>
                                        {errors.password_empty}
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStatetoProps,{ loginUser })(Login);
