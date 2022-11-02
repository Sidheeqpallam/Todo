const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
require("./config/db.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/user"));

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
