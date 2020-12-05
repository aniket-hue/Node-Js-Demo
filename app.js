const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const { routes, products } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(3000);
