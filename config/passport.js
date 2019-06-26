const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/User');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JwtSecretKey;


module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({_id: jwt_payload.id})
            .then(user => {    
                if (user) {
                    return done(null, user);
                } 
                else {
                    return done(null, false);
                }
            })
            .catch(err => {
                return done(err, false);
            });
    }));
}