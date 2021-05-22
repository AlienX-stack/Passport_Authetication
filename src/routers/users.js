const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User Model
const User = require("../models/User");

// Login Page
router.get("/users/login", (req, res) => {
  res.render("login");
});

// SignUp Page
router.get("/users/register", (req, res) => {
  res.render("register");
});

// Register Handle
router.post("/users/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all the fields" });
  }

  // Check password match
  if (password !== password2) errors.push({ msg: "Passwords don't match" });

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation Passed
    const user = await User.findOne({ email });
    if (user) {
      // User exists
      errors.push({ msg: "Email is already registered" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      // Hash password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, async (error, hash) => {
          try {
            if (error) throw error;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            await newUser.save();
            res.redirect("/users/login");
          } catch (error) {
            console.log(error);
          }
        });
      });
    }
  }
});

module.exports = router;
