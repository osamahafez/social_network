const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

module.exports = router;
