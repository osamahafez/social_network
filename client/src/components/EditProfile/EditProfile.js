import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../../actions/profileAction';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {

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

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.profile.profile) {
            const { profile } = nextProps.profile;

            profile.company = isEmpty(profile.company) ? '' : profile.company;
            profile.website = isEmpty(profile.website) ? '' : profile.website;
            profile.github = isEmpty(profile.github) ? '' : profile.github;
            profile.location = isEmpty(profile.location) ? '' : profile.location;
            profile.handle = isEmpty(profile.handle) ? '' : profile.handle;
            profile.status = isEmpty(profile.status) ? '' : profile.status;
            profile.skills = isEmpty(profile.skills) ? '' : profile.skills.join();
            profile.bio = isEmpty(profile.bio) ? '' : profile.bio;
            profile.social = isEmpty(profile.social) ? {} : profile.social;
            profile.social.linkedin = isEmpty(profile.social.linkedin) ? '' : profile.social.linkedin;
            profile.social.facebook = isEmpty(profile.social.facebook) ? '' : profile.social.facebook;
            profile.social.youtube = isEmpty(profile.social.youtube) ? '' : profile.social.youtube;
            profile.social.instagram = isEmpty(profile.social.instagram) ? '' : profile.social.instagram;
            profile.social.twitter = isEmpty(profile.social.twitter) ? '' : profile.social.twitter;

            this.setState({
                handle: profile.handle,
                company: profile.company,
                location: profile.location,
                website: profile.website,
                bio: profile.bio,
                skills: profile.skills,
                status: profile.status,
                github: profile.github,
                youtube: profile.social.youtube,
                facebook: profile.social.facebook,
                instagram: profile.social.instagram,
                linkedin: profile.social.linkedin,
                twitter: profile.social.twitter
            });
            
        }
        
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    
    onSubmitHandler = (e) => {
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            location: this.state.location,
            website: this.state.website,
            bio: this.state.bio,
            skills: this.state.skills,
            status: this.state.status,
            github: this.state.github,
            youtube: this.state.youtube,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
            twitter: this.state.twitter
        }

        this.props.createProfile(profileData, this.props.history);
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
            <div className='edit-profile'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Profile</h1>
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
                                    info='* Required'
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
                                    info='* Requried. Also Separate each skill with a comma (,)'
                                    error={errors.skills_empty}
                                />

                                <button type='button' className='btn btn-dark btn-sm mb-3' onClick={this.socialBtnHandler}>Social Links</button>
                                {socialLinks}

                                <input type="submit" value="Update" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(EditProfile));