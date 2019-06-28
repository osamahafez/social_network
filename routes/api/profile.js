const express = require('express')
const router = express.Router()
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');


// @route GET api/profile
// @desc get user's profile page
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({user: req.user._id})
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

    


    let profileFields = {};
    profileFields.user = req.user._id;
   
    if(req.body.handle)     profileFields.handle     = req.body.handle;
    if(req.body.company)    profileFields.company    = req.body.company;
    if(req.body.website)    profileFields.website    = req.body.website;
    if(req.body.status)     profileFields.status     = req.body.status;
    if(req.body.bio)        profileFields.bio        = req.body.bio;
    if(req.body.github)     profileFields.github     = req.body.github;
    if(req.body.skills)     profileFields.skills     = req.body.skills.split(',');
    
    profileFields.social = {};
    if(req.body.youtube)     profileFields.social.youtube    = req.body.youtube;
    if(req.body.twitter)     profileFields.social.twitter    = req.body.twitter;
    if(req.body.facenook)    profileFields.social.facenook   = req.body.facenook;
    if(req.body.linkedin)    profileFields.social.linkedin   = req.body.linkedin;
    if(req.body.instagram)   profileFields.social.instagram  = req.body.instagram;


    let errors = {};

    Profile.findOne({user: req.user._id})
        .then(profile => {
            if(profile) {
                // Update
                Profile.findOneAndUpdate({user: req.user._id}, {$set: profileFields}, {new: true})
                    .then(profile => {
                        return res.status(200).json(profile);
                    })
                    .catch(err => res.json(err));
            }
            else {
                // Create

                // check first if the handle is used by someone else
                Profile.find({handle: profileFields.handle})
                    .then(found => {
                        if(found) {
                            errors.handle = 'this handle already exists';
                            res.status(400).json(errors);
                        }
                        
                        // save the new profile
                        new Profile(profileFields).save()
                            .then(profile => {
                                return res.status(201).json(profile);
                            })
                            .catch(err => res.json(err));
                    })
            }
        })
        .catch(err => res.json(err));

});


module.exports = router;