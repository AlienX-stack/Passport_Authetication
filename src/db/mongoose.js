const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/passport-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To Database"))
  .catch((err) => console.log(err));
