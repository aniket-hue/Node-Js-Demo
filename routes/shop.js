const express = require("express");
const path = require("path");
const router = express.Router();

const { products } = require("./admin");

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", { products: products, title: "Shop", path: "/" });
});

module.exports = router;
