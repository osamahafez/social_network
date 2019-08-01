const express = require('express')
const router = express.Router()
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const User = require('../../models/User');
const Profile = require('../../models/Profile');



// @route GET api/profile
// @desc get user's profile page
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({user: req.user._id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            
            let errors = {};

            if(!profile) {
                errors.noprofile = 'Profile not found'
                return res.status(404).json(errors);
            }

            return res.status(200).json(profile);

        })  
        .catch(err => res.json(err));
});


// @route POST api/profile
// @desc create or update user's profile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // user's info
    // console.log(req.user)

    const {errors, errorsFound} = validateProfileInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    }


    let profileFields = {};
    profileFields.user = req.user._id;
   
    if(req.body.handle)     profileFields.handle     = req.body.handle;
    if(req.body.company)    profileFields.company    = req.body.company;
    if(req.body.location)   profileFields.location   = req.body.location;
    if(req.body.website)    profileFields.website    = req.body.website;
    if(req.body.status)     profileFields.status     = req.body.status;
    if(req.body.bio)        profileFields.bio        = req.body.bio;
    if(req.body.github)     profileFields.github     = req.body.github;
    if(req.body.skills)     profileFields.skills     = req.body.skills.split(',');
    
    profileFields.social = {};
    if(req.body.youtube)     profileFields.social.youtube    = req.body.youtube;
    if(req.body.twitter)     profileFields.social.twitter    = req.body.twitter;
    if(req.body.facebook)    profileFields.social.facebook   = req.body.facebook;
    if(req.body.linkedin)    profileFields.social.linkedin   = req.body.linkedin;
    if(req.body.instagram)   profileFields.social.instagram  = req.body.instagram;


    Profile.findOne({user: req.user._id})
        .then(profile => {
            if(profile) {
                // Update
                Profile.findOneAndUpdate({user: req.user._id}, {$set: profileFields}, {new: true, useFindAndModify: false})
                    .then(profile => {
                        return res.status(200).json(profile);
                    })
                    .catch(err => res.json(err));
            }
            else {
                // Create

                // check first if the handle is used by someone else
                Profile.findOne({handle: profileFields.handle})
                    .then(found => {
                        if(found) {
                            errors.handle = 'this handle already exists';
                            return res.status(400).json(errors);
                        }
                        else {
                            
                            // save the new profile
                            new Profile(profileFields).save()
                                .then(profile => {
                                    return res.status(201).json(profile);
                                })
                                .catch(err => res.json(err));
                        }
                        
                    })
            }
        })
        .catch(err => res.json(err));

});


// @route GET api/profile/handle/:handle
// @desc get user's profile by Handle
// @access Public
router.get('/handle/:handle', (req, res) => {

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(profile) {
                return res.status(200).json(profile);
            }
            else {
                return res.status(404).json({error: 'Profile Not Found'});
            }
        })
        .catch(err => res.json(err));
});


// @route GET api/profile/user/:user_id
// @desc get user's profile by ID
// @access Public
router.get('/user/:user_id', (req, res) => {

    Profile.findById(req.params.user_id)
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(profile) {
                return res.status(200).json(profile);
            }
            else {
                return res.status(404).json({error: 'Profile Not Found'});
            }
        })
        .catch(err => res.json(err)); 
});


// @route GET api/profile/all
// @desc get all the profiles
// @access Public
router.get('/all', (req, res) => {

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(profiles) {
                return res.status(200).json(profiles);
            }
            else {
                return res.status(404).json({error: 'No Profiles Found'});
            }
        })
        .catch(err => res.json(err));
});

// @route POST api/profile/experience
// @desc add an experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, errorsFound} = validateExperienceInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    }


    Profile.findOne({user: req.user._id})
        .then(profile => {
            if(!profile) {
                return res.status(404).json({error: 'Profile is not found'});
            } 
            else {
                const newExp = {
                    title: req.body.title,
                    description: req.body.description,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current
                }

                profile.experience.unshift(newExp);
                profile.save()
                    .then(newProfile => res.status(200).json(newProfile))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));

});



// @route POST api/profile/education
// @desc add an education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, errorsFound} = validateEducationInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    }


    Profile.findOne({user: req.user._id})
        .then(profile => {
            if(!profile) {
                return res.status(404).json({error: 'Profile is not found'});
            } 
            else {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    field: req.body.field,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current
                }

                profile.education.unshift(newEdu);
                profile.save()
                    .then(newProfile => res.status(200).json(newProfile))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));

});


// @route DELETE api/profile/experience/:exp_id
// @desc delete experience
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req, res) => {

    Profile.findOne({user: req.user._id})
        .then(profile => {
            
            let newProfileExp = profile.experience.filter(exp => {
                return (req.params.exp_id != exp._id);
            });

            profile.experience = newProfileExp;

            profile.save()
                .then(profile => res.status(200).json(profile))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

// @route DELETE api/profile/education/:edu_id
// @desc delete education
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req, res) => {

    Profile.findOne({user: req.user._id})
        .then(profile => {
            
            let newProfileEdu = profile.education.filter(edu => {
                return (req.params.edu_id != edu._id);
            });

            profile.education = newProfileEdu;

            profile.save()
                .then(profile => res.status(200).json(profile))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});


// @route DELETE api/profile
// @desc delete profile and user
// @access Private
router.delete('/', passport.authenticate('jwt', {session:false}), (req, res) => {

    Profile.findOneAndDelete({user: req.user._id})
        .then(() => {
            User.findOneAndDelete({_id: req.user._id})
                .then(() => {
                    res.status(200).json({msg: 'User and Profile deleted successfully'});
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

module.exports = router;