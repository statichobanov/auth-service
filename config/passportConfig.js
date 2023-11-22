"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function initPassport(userInteractor) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await userInteractor.findUserByUsername(username);
          if (!user || !(await user.isValidPassword(password))) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

module.exports = initPassport;