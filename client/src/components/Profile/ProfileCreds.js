import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

const ProfileCreds = (props) => {

    const { experience, education } = props;

    const expList = experience.map(exp => 
        <li key={exp._id} className='list-group-item'>
            <h4>{exp.company}</h4>
            <p><Moment format='DD/MM/YYYY'>{exp.from}</Moment>  - {isEmpty(exp.to) ? 'Current' : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}</p>
            <p><strong>Position: </strong> {exp.title}</p>
            <p><strong>Location: </strong>{isEmpty(exp.location) ? 'Not Found' : exp.location}</p>
            <p><strong>Description: </strong> {isEmpty(exp.description) ? 'Not Found' : exp.description} </p>
        </li>   
    )

    const eduList = education.map(edu => 
        <li key={edu._id} className='list-group-item'>
            <h4>{edu.school}</h4>
            <p><Moment format='DD/MM/YYYY'>{edu.from}</Moment>  - {isEmpty(edu.to) ? 'Current' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}</p>
            <p><strong>Degree: </strong> {edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.field}</p>
            <p><strong>Location</strong> {isEmpty(edu.location) ? 'Not Found' : edu.location} </p>
        </li>   
    )

    return (
        <div className='profileCreds'>  
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <ul className="list-group">
                        {expList}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <ul className="list-group">
                        {eduList}
                    </ul>
                </div>
          </div>
        </div>
    )
}

ProfileCreds.propTypes = {
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired
}

export default ProfileCreds;