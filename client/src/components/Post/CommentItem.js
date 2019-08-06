import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postAction';

class CommentItem extends Component {

    onDeleteComment = (commentId, postId) => {
        this.props.deleteComment(commentId, postId);
    }

    render() {

        const { comment, postId, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-8">
                        <p className="lead">{comment.text}</p>
                    </div>
                    
                    <div className="col-md-2">
                        {(auth.user.id === comment.user ? (<span>
                            <button onClick={() => this.onDeleteComment(comment._id, postId)} className='btn btn-danger float-right'>
                                <i className="fas fa-times"></i>
                            </button>
                        </span>) : null)}
                    </div>
                    
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);