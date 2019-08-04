import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = (props) => {

    const postItems = props.posts.map(post => 
        <PostItem key={post._id} post={post} />
    );

    return (
        <div>{postItems}</div>
    );
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;