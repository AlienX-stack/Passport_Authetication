const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../src/models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Match User
        const user = await User.findOne({ email: email });
        try {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          //Match password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) return done(null, user);
            else return done(null, false, { message: "Password Incorrect" });
          });
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
