import React from 'react'
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const ProfileAbout = (props) => {

    const { profile } = props;

    const skills = profile.skills.map((skill,i) => 
        <div key={i} className="p-3"><i className="fa fa-check pr-2"></i>{skill}</div>
    );

    return (
        <div className='profileAbout'>
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{profile.user.name}'s Bio</h3>
                <p className="lead">
                    {isEmpty(profile.bio) ? 'Has No Bio' : profile.bio}    
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                   {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;