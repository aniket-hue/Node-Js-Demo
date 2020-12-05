const express = require("express");
const path = require("path");

const router = express.Router();

router.post("/add-product", (req, res, next) => {
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

module.exports = router;
