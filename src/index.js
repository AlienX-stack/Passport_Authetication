require("dotenv").config();
const express = require("express");
// const ejsLint = require("ejs-lint");
const expressLayouts = require("express-ejs-layouts");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/users");
const dbConnect = require("./db/dbmongo");

// Connected to database
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
// To get data from the form
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT} ...`);
});
