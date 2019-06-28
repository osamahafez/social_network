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


module.exports = router;