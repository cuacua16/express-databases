const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.getUsers((err, users) => {
    res.json(users);
  });
});

router.post("/", (req, res) => {
  const userData = {
    id: null,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    created_at: null,
    updated_at: null,
  };
  User.insertUser(userData, (err, data) => {
    if (data && data.insertId) {
      res.json({
        success: true,
        msg: "Usuario insertado",
        data: data,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "Error",
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const userData = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    created_at: null,
    updated_at: null,
  };
  User.updateUser(userData, (err, data) => {
    if (data && data.msg) {
      res.json(data);
    } else {
      res.json({
        success: false,
        msg: "error updating user",
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  User.deleteUser(req.params.id, (err, data) => {
    if (data && (data.msg == "deleted" || data.msg == "not exists")) {
      res.json({
        success: true,
        msg: data.msg,
        data,
      });
    } else {
      res.status(500).json({ success: false, msg: "error" });
    }
  });
});

module.exports = router;
