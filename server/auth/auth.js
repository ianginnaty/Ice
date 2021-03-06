const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user/user');
const database = require('../database/config');

module.exports = function(passport){
  let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = database.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({id: jwt_payload.sub}, (err, user) => {
        if(err){
          return done(err, false);
        }

        if(user){
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      });
    }));
  }
