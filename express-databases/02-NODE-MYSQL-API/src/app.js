const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/users", userRoutes);

//static files

app.listen(app.get("port"), () => {
  console.log("Express server listening on port" + app.get("port"));
});
