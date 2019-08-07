import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/postAction'


class PostForm extends Component {

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
        const postData = {
            text: this.state.text,
            name: this.props.auth.user.name,
            avatar: this.props.auth.user.avatar
        }
        this.props.addPost(postData);
        this.setState({text:''});
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-primary post-card">
                    <div className="card-header bg-dark text-white">
                        What's on your mind...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <TextAreaFieldGroup 
                                    placeholder='Create a post'
                                    name='text'
                                    value={this.state.text}
                                    onChange={this.onChangeHandler}
                                    error={errors.text_empty}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Post It</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);