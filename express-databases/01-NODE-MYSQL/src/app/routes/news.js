const dbConnection = require("../../config/dbConnection");

module.exports = (app) => {
  const connection = dbConnection();

  app.get("/", (req, res) => {
    connection.query("SELECT * FROM news", (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.render("news/news", { news: result });
    });
  });

  app.post("/news", (req, res) => {
    const { title, news } = req.body;
    connection.query(
      `INSERT INTO news SET?`,
      {
        title: title,
        news: news,
      },
      (err, result) => {
        res.redirect("/");
      }
    );
  });

  app.post("/delete", (req, res) => {
    const { id } = req.body;
    connection.query(`DELETE FROM news WHERE id_news=${id}`, (err, result) => {
      res.redirect("/");
    });
  });
};
