module.exports = () => {
  const mongoose = require("mongoose");

  const db = require("../libs/db-connection")();

  let Task = new mongoose.Schema({
    title: String,
    description: String,
    status: Boolean,
  });

  return mongoose.model("task", Task);
};
