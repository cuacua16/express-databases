const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const Product = require("../models/product");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/add-product", (req, res, next) => {
  res.render("products/add-product");
});

router.post("/add-product", (req, res) => {
  const product = new Product();
  product.category = req.body.categoryName;
  product.name = req.body.productName;
  product.price = req.body.productPrice;
  product.cover = faker.image.image();
  product.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/add-product");
  });
});

router.get("/products", (req, res) => {
  res.redirect("/products/1");
});

router.get("/products/:page", (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;
  if (page < 1) {
    page = 1;
  }
  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count((err, count) => {
        if (err) {
          return next(err);
        } else {
          res.render("products/products", {
            products: products,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        }
      });
    });
});

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.cover = faker.image.image();
    product.save((err) => {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect("add-product");
});

module.exports = router;
