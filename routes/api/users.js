const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users
// @access Public
router.get('/', (req, res) => {
    res.json({
        msg: 'Users Page'
    });
});


// @route POST api/users/register
// @desc register a user
// @access Public
router.post('/register', (req, res) => {
    
    // first validation
    const {errors, errorsFound} = validateRegisterInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(409).json({email: "Email Already Exists"});
        }
        else {
            // fetching the avatar of the email user
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar
            });

            // hasing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            return res.status(201).json(user);
                        })
                        .catch(err => {
                            return res.json(err);
                        });
                });
            });
        }
    })
    .catch((err) => {
        return res.json(err);
    });

});


// @route POST api/users/login
// @desc Login a user / returning the JWT token
// @access Public
router.post('/login', (req, res) => {

    // first validation
    const {errors, errorsFound} = validateLoginInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((isEqual) => {
                        if(isEqual) {
                            
                            //payload consists of user info used in token
                            const payload = {
                                id: user._id,
                                name: user.name,
                                avatar: user.avatar
                            }

                            jwt.sign(
                                payload, 
                                keys.JwtSecretKey, 
                                { expiresIn: '5h' }, 
                                (err, token) => {
                                    if(err) {
                                        return res.json({error: err});
                                    }
                                    else {
                                        return res.status(200).json({
                                            token: "Bearer " + token
                                        });
                                    }
                            });

                        }
                        else {
                            return res.status(400).json({password: "Password is not correct"})
                        }
                    })
                    .catch(err => res.json(err));
            }
            else {
                return res.status(404).json({email: "User is not found"})
            }
        })
        .catch(err => res.json(err));

});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    return res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;
