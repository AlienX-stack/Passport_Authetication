const express = require("express");
const expressLayouts = require("express-ejs-layouts");

require("./db/mongoose");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/users");

const app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use(homeRouter);
app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT} ...`);
});
