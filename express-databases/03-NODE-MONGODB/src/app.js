const express = require("express");
const app = express();
const logger = require("morgan");
const indexRoutes = require("./routes/index");
const path = require("path");

//settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(logger(`dev`));
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", indexRoutes);

app.listen(app.get("port"), () => {
  console.log("listening on port " + app.get("port"));
});
