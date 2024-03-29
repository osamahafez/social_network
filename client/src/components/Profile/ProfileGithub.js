import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ProfileGithub extends Component {

    state = {
        clientId: '687b9efd6a48fee3b5c8', // I tried it without clientId and clientSecret and it worked
        clientSecret: '336f11376b3a25eae74f513181aa3864226c60a9',
        count: 5,
        sort: 'created: asc',
        repos: []
    }

    componentDidMount() {

        const { username } = this.props
        const { clientId, clientSecret, count, sort } = this.state;

        // I tried it without clientId and clientSecret and it worked
        // also fetch is the same as axios (axios has extra features)
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                if(this.refs.myRef) { // check if myRef is found then we take the data
                    this.setState({repos:data});
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {

        const { repos } = this.state;
        
        const repoItems = repos.map(repo =>
            <div key={repo.id}>
                <div className="row">
                    <div className="col-md-6">
                        <h4><a href={repo.html_url} className="text-primary" target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className='badge badge-info mr-1'>Stars: {repo.stargazers_count}</span>
                        <span className='badge badge-secondary mr-1'>Watchers: {repo.watchers_count}</span>
                        <span className='badge badge-success mr-1'>Forks: {repo.forks_count}</span>
                    </div>
                </div>
            </div>
        )

        return (
            <div ref='myRef'>
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        )
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub;