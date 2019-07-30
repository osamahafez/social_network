import React, { Component } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileAction';

class Education extends Component {

    deleteEduHandler = (edu_id) => {
        this.props.deleteEducation(edu_id)
    }

    render() {

        const educationTable = this.props.education.map((edu, i) => {
            return (
                        
                <tr key={i}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.field}</td>
                    <td> <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {(edu.to === null) ? 'Now' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => this.deleteEduHandler(edu._id)}>Delete</button></td>
                </tr>

            )
        });

        return (
            <div className='mt-3'>
                <h2>Education</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">School</th>
                            <th scope="col">Degree</th>
                            <th scope="col">Field</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationTable}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);