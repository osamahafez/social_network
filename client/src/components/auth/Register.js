import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    componentDidMount() {
        // prevent user from entering this page if he is authenticated
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) { // check if the this.props.errors from the errorReducer have arrived
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

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

        this.props.registerUser(newUser, this.props.history);
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

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Name'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name_empty || errors.name_length}
                                />
                                
                                <TextFieldGroup 
                                    type='email'
                                    placeholder='Email Address'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email_empty || errors.email_format}
                                    info=' This site uses Gravatar so if you want a profile image, use a Gravatar email'
                                />
                                                      
                                <TextFieldGroup 
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password || errors.password_length}
                                />
                                
                                <TextFieldGroup 
                                    type='password'
                                    placeholder='Confirm Password'
                                    name='password2'
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2 || errors.password_match}
                                />

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


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
