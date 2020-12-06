const express = require("express");
const path = require("path");
const router = express.Router();
const { getAddProduct, postAddProduct } = require("../controllers/products");

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

exports.routes = router;
