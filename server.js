const express = require("express");
const app = express();
const users = require("./routes/users");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/userdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to monodb");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });

app.use(express.json());
app.use("/api/users", users);

const port = process.env.PORT || 7000;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port http://localhost:${port}`);
});
