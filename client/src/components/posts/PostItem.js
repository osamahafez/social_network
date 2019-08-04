import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostItem extends Component {

    onDeleteHandler = () => {
        console.log('delete');
    }

    render() {
        const { post, auth } = this.props;
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
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-up"></i>
                            <span className="badge badge-light ml-1">{post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/api/posts/comment/${post._id}`} className="btn btn-info mr-1"> Comments </Link>
                        {(post.user === auth.user.id) ? 
                            <button onClick={this.onDeleteHandler} className="btn btn-danger"> <i className='fas fa-times'></i> </button>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PostItem);