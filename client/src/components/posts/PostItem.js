import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, likePost, unlikePost } from '../../actions/postAction';
import classnames from 'classnames';

class PostItem extends Component {
    
    onLikeHandler = (post_id) => {
        this.props.likePost(post_id);
    }

    onUnlikeHandler = (post_id) => {
        this.props.unlikePost(post_id);
    }
    
    onDeleteHandler = (post_id) => {
        this.props.deletePost(post_id);
    }

    checkLiked = (likes) => {
        const { user } = this.props.auth;
        if(likes.filter(like => like.user === user.id).length > 0) {
            return true
        }
        else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions } = this.props;
        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img 
                                className="rounded-circle d-none d-md-block" 
                                src={post.avatar}
                                alt="" 
                            />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>

                        {showActions ? (<span>
                            <button type="button" onClick={() => this.onLikeHandler(post._id)} className="btn btn-light mr-1">
                                <i className={classnames('text-secondary fas fa-thumbs-up', {'text-info': this.checkLiked(post.likes)})}></i>
                                <span className="badge badge-light ml-1">{post.likes.length}</span>
                            </button>
                            <button type="button" onClick={() => this.onUnlikeHandler(post._id)} className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1"> Comments </Link>
                            {(post.user === auth.user.id) ? 
                                <button onClick={() => this.onDeleteHandler(post._id)} className="btn btn-danger"> <i className='fas fa-times'></i> </button>
                                : null}
                        </span>) : null}

                        
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostItem);