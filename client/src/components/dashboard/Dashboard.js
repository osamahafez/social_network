import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import Spinner from '../common/spinner/Spinner';
import { Link } from 'react-router-dom';
import ProfileButtons from './ProfileButtons';
import Experience from './Experience';

class Dashboard extends Component {

  
    componentDidMount() {
        // replaced by PrivateRoute component
        // if(!this.props.auth.isAuthenticated) {
        //     this.props.history.push('/login')
        // }
        
        this.props.getCurrentProfile();
    }

    onDeleteHandler = () => {
        if(window.confirm("Are you sure ?\nYou can't restore your account.")) {
            this.props.deleteAccount();
        } 
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;
        if(profile === null || loading) {
            dashboardContent = <Spinner />
        }
        else {
            if(Object.keys(profile).length > 0) { // if profile is not empty

                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> </p>
                        <ProfileButtons />
                        <Experience experience={profile.experience} />
                       
                        {/* Delete account btn */}
                        <button className="btn btn-danger mt-5" onClick={this.onDeleteHandler} style={{display:'block'}} >
                            Delete Account
                        </button>
                    </div>
                );
            }
            else { // if profile is empty
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>Please create your profile.</p>
                        <Link className='btn btn-info btn-lg btn-block' to='/create-profile'>Create Profile</Link>
                    </div>

                );
            }
            
        }

        return (
            <div className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
