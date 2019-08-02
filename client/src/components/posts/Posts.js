import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';

class Posts extends Component {
    render() {
        return (
            <div>
                <PostForm />
            </div>
        )
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps)(Posts);