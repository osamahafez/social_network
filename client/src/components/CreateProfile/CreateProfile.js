import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {

    state = {
        handle: '',
        company: '',
        location: '',
        website: '',
        bio: '',
        skills: '',
        status: '',
        github: '',
        displaySocial: false,
        youtube: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        errors: {}
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    
    onSubmitHandler = (e) => {
        e.preventDefault();
        
        console.log(this.state);
    }
    
    socialBtnHandler = () => {
        this.setState(prevState => ({
            displaySocial: !prevState.displaySocial,
        }));
    }
    

    render() {
        
        const { errors } = this.state;
        const options = [
            {label: 'Select a professional status', value: 0},
            {label: 'Junior Developer', value: 'Junoir Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Quality Assurance', value: 'Quality Assurance'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Student', value: 'Student'},
        ]

        let socialLinks = null;
        if(this.state.displaySocial) {
            socialLinks = (
                <div>
                    <InputGroup 
                        type='text'
                        placeholder='Linkedin'
                        name='linkedin'
                        value={this.state.linkedin}
                        onChange={this.onChangeHandler}
                        icon='fab fa-linkedin-in'
                        error={errors.linkedin_format}
                    />

                    <InputGroup 
                        type='text'
                        placeholder='Facebook'
                        name='facebook'
                        value={this.state.facebook}
                        onChange={this.onChangeHandler}
                        icon='fab fa-facebook-f'
                        error={errors.facebook_format}
                    />
                    <InputGroup 
                        type='text'
                        placeholder='Twitter'
                        name='twitter'
                        value={this.state.twitter}
                        onChange={this.onChangeHandler}
                        icon='fab fa-twitter'
                        error={errors.twitter_format}
                    />
                    <InputGroup 
                        type='text'
                        placeholder='Youtube'
                        name='youtube'
                        value={this.state.youtube}
                        onChange={this.onChangeHandler}
                        icon='fab fa-youtube'
                        error={errors.youtube_format}
                    />
                    <InputGroup 
                        type='text'
                        placeholder='Instagram'
                        name='instagram'
                        value={this.state.instagram}
                        onChange={this.onChangeHandler}
                        icon='fab fa-instagram'
                        error={errors.instagram_format}
                    />
                </div>
            );
        }

        return (
            <div className='create-profile'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Profile</h1>
                            <form onSubmit={this.onSubmitHandler}>

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Handle'
                                    name='handle'
                                    value={this.state.handle}
                                    onChange={this.onChangeHandler}
                                    info='* Required'
                                    error={errors.handle_size || errors.handle_empty}
                                />

                                <SelectListGroup
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onChangeHandler}
                                    options={options}
                                    error={errors.status_empty}
                                />

                                <TextAreaFieldGroup
                                    placeholder='Bio'
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onChangeHandler}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Company'
                                    name='company'
                                    value={this.state.company}
                                    onChange={this.onChangeHandler}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Location'
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onChangeHandler}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Website'
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.onChangeHandler}
                                    error={errors.website_format}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Github Username'
                                    name='github'
                                    value={this.state.github}
                                    onChange={this.onChangeHandler}
                                />

                                <TextFieldGroup 
                                    type='text'
                                    placeholder='Skills'
                                    name='skills'
                                    value={this.state.skills}
                                    onChange={this.onChangeHandler}
                                    info='Separate each skill with a comma (,)'
                                    error={errors.skills_empty}
                                />

                                <button type='button' className='btn btn-dark btn-sm mb-3' onClick={this.socialBtnHandler}>Social Links</button>
                                {socialLinks}

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);