const LocalStrategy = require("passport-local").Strategy;

const User = require("../app/models/user");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        User.findOne({ "local.email": email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(
              null,
              false,
              req.flash("signupMessage", "The email is already in use")
            );
          } else {
            let newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        User.findOne({ "local.email": email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "The user not exist")
            );
          }
          if (!user.validatePassword(password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Wrong password")
            );
            S;
          }
          return done(null, user);
        });
      }
    )
  );
};
