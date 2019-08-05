import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import CommentFrom from './CommentForm';
import Spinner from '../common/spinner/Spinner';

class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.post_id);
    }

    render() {

        const { post, loading } = this.props.post
        let postContent;

        if(post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />;
        }
        else {
            postContent = (
            <div>
                <PostItem post={post} showActions={false} />
                <CommentFrom post_id={post._id} />
            </div>
            );
        }

        return (
            <div className='post'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)