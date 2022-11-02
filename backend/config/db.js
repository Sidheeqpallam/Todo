const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });
