import React, { Component } from 'react'

class Experience extends Component {
    render() {

        const experienceTable = this.props.experience.map((exp, i) => {
            // let endDate = (exp.to === '') ? exp.to : exp.to;
            // console.log(endDate);
            return (
                        
                <tr key={i}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>{exp.from} - {exp.to}</td>
                    <td><button className="btn btn-danger btn-sm">Delete</button></td>
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

export default Experience;