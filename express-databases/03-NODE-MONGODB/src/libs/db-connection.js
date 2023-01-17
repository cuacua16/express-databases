const mongoose = require("mongoose");
let db;
module.exports = () => {
  if (!db) {
    db = mongoose.connect("mongodb://127.0.0.1/crud-example", {}, (err) => {
      if (err) throw err;
      else {
        console.log("conexion correcta");
      }
    });
  }
  return db;
};
