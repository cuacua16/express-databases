const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1/rest-api-example")
  .then(function (db) {
    console.log("db conected");
  })
  .catch(function (err) {
    console.log(err);
  });

//settings
app.set("port", process.env.PORT || 3000);

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/users", require("./routes/user"));
//static files

//error handlers

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});
