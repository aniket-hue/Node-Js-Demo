const express = require("express");
const bodyParser = require("body-parser");
const { routes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const { get404 } = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", routes);
app.use(shopRoutes);
app.use(get404);

app.listen(3000);
