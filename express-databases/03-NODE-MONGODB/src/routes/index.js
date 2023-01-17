const express = require("express");
const router = express.Router();
const model = require("../model/task")();

router.get("/", (req, res) => {
  model.find({}, (err, tasks) => {
    if (err) {
      throw err;
    } else {
      res.render("index", { title: "CRUD", tasks: tasks });
    }
  });
});

router.post("/add", (req, res) => {
  let body = req.body;
  body.status = false;
  model.create(body, (err, task) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/turn/:id", (req, res) => {
  model.findById(req.params.id, (err, task) => {
    if (err) {
      throw err;
    } else {
      task.status = !task.status;
      task.save().then(() => {
        res.redirect("/");
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  model.findByIdAndRemove(req.params.id, (err, task) => {
    if (err) throw err;
    else {
      res.redirect("/");
    }
  });
});
module.exports = router;
