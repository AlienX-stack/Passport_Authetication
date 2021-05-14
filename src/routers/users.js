const express = require("express");
const router = express.Router();

// Login Page
router.get("/users/login", (req, res) => {
  res.render("login");
});

// SignUp Page
router.get("/users/register", (req, res) => {
  res.render("register");
});

module.exports = router;
