import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
    logoutHandler = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        
        // replaced by PrivateRoute component
        //this.props.history.push('/login');
    };

    render() {
        const { user, isAuthenticated } = this.props.auth;

        const guestLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                        Sign Up
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        );

        const authLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/feed'>
                        Posts Feed
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                        Dashboard
                    </Link>
                </li>
                <li className='nav-item'>
                    <div
                        className='nav-link'
                        onClick={this.logoutHandler}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={user.avatar}
                            alt={user.name}
                            style={{
                                width: '25px',
                                marginRight: '5px',
                                borderRadius: '50%'
                            }}
                        />
                        Logout
                    </div>
                </li>
            </ul>
        );

        return (
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
                <div className='container'>
                    <Link className='navbar-brand text-primary' to='/'>
                        DevNetwork
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#mobile-nav'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>

                    <div className='collapse navbar-collapse' id='mobile-nav'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/profiles'>
                                    Developers
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
