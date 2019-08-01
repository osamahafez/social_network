import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileAction';
import Spinner from '../common/spinner/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {

        const { profiles, loading } = this.props.profile;

        let profileItem;

        if(profiles === null || loading) {
            profileItem = <Spinner />
        }
        else {
            if(profiles.length > 0) {
                profileItem = profiles.map((profile) => 
                    <ProfileItem key={profile._id} profile={profile} />
                )
            }
            else {
                profileItem = <h3>No Profiles Found</h3>;
            }
        }

        return (
            <div className='profiles'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className='display-4 text-center'>Profiles</div>
                        <p className="text-muted lead text-center">Connect with other developers</p>
                        {profileItem}
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})


export default connect(mapStateToProps, { getProfiles })(Profiles);