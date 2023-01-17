const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1/express-pagination", (err) => {
  if (err) console.log(err);
  else {
    console.log("connection correct");
  }
});

//settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", indexRoutes);

app.listen(app.get("port"), () => {
  console.log("server listening on port " + app.get("port"));
});
