const express = require("express");
const path = require("path");
const router = express.Router();
const { getProducts } = require("../controllers/products");

router.get("/", getProducts);

module.exports = router;
