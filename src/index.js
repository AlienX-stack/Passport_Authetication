require("dotenv").config();
const express = require("express");
// const ejsLint = require("ejs-lint");
const expressLayouts = require("express-ejs-layouts");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/users");
const dbConnect = require("./db/dbmongo");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Connected to database
dbConnect();

// Passport Config
require("../config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
// To get data from the form
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// // Middleware
// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use(homeRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT} ...`);
});
