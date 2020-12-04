const express = require("express");

const router = express.Router();

router.post("/P", (req, res, next) => {
  res.redirect("/");
});

router.get("/Product", (req, res, next) => {
  res.send(
    "<form action='/P' method = 'POST'><input type = 'text' name='title'/><button type='submit'>Click</button></form>"
  );
});

module.exports = router;
