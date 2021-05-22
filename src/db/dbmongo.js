const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    const check = await mongoose.connect(process.env.MONGODB_CONNECT, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
