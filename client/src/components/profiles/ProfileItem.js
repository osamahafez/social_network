import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

const ProfileItem = (props) => {
     const { profile } = props; 
    return (
        <div className="card text-white bg-dark mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} alt={profile.user.name} style={{borderRadius: '50%'}}/>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h4>{profile.user.name}</h4>
                        <p className='lead'>{profile.status} {isEmpty(profile.company) ? null : `at ${profile.company}`}</p>
                        <Link to={`/profile/${profile.handle}`} className='btn btn-info'>View Profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h5>Skills</h5>
                        <ul className="list-group">
                            {profile.skills.slice(0, 4).map((skill,i) => 
                                <li key={i} className="list-group-item list-group-item-secondary"> <i className="fas fa-check pr-2" />{skill}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;