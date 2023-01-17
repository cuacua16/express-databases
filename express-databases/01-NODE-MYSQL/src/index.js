const app = require("./config/server");
require("./app/routes/news")(app); //este archivo exporta una funcion que recibe una app

//starting the server
app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
