'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/User');

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => User.findById(id, (err, user) => cb(err, user)));

passport.use(new LocalStrategy(
  (username, password, done) => {
    Users.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user)  {
        return done(null, false);
      }

      if (user.password !== password) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
))

module.exports = passport;