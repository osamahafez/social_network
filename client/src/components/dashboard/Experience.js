import React, { Component } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component {

    deleteExpHandler = (exp_id) => {
        this.props.deleteExperience(exp_id)
    }

    render() {

        const experienceTable = this.props.experience.map((exp, i) => {
            return (
                        
                <tr key={i}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td> <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {(exp.to === null) ? 'Now' : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => this.deleteExpHandler(exp._id)}>Delete</button></td>
                </tr>

            )
        });

        return (
            <div>
                <h2>Experience</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experienceTable}
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);