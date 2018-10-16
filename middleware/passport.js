module.exports = (app) => {
  const passport = require('passport');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.findById(id, (err, user) => cb(err, user)));
}