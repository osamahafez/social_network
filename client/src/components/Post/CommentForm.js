import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/postAction'


class CommentForm extends Component {

    state = {
        text: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const commentData = {
            text: this.state.text,
            name: this.props.auth.user.name,
            avatar: this.props.auth.user.avatar
        }
        this.props.addComment(commentData, this.props.post_id);
        this.setState({text:''});
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-primary">
                    <div className="card-header bg-dark text-white">
                        Write a comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <TextAreaFieldGroup 
                                    placeholder='Replay to post'
                                    name='text'
                                    value={this.state.text}
                                    onChange={this.onChangeHandler}
                                    error={errors.text_empty}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    post_id: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);