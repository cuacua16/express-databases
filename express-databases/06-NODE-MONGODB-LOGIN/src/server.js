const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { url } = require("./config/database");

mongoose.set("strictQuery", true);
mongoose.connect(url);

require("./config/passport")(passport);

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(morgan(`dev`));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    //manejar sesiones de express
    secret: "palabrasecretaparasesiones",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); //permite autenticar
app.use(passport.session()); //unirlo a las sesiones
app.use(flash()); //comunicar distintos html

//routes
require("./app/routes")(app, passport);

//static files
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images"));

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
