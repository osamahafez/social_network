import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByHandle } from '../../actions/profileAction';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout';
import Spinner from '../common/spinner/Spinner';

class Profile extends Component {

    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {

        const { profile, loading } = this.props.profile;
        let profileContent;

        if(profile === null || loading) {
            profileContent = <Spinner />
        }
        else {
            profileContent = (
                <div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds experience={profile.experience} education={profile.education} />
                    {isEmpty(profile.github) ? null : <ProfileGithub username={profile.github} />}
                </div>
            );
        }

        return (
            <div className='profile'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);