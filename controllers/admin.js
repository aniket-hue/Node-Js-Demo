const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    product: [],
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    price,
    imageUrl,
    description,
  }).then(() => res.redirect("/"));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true";
  if (!editMode) return res.redirect("/");
  const id = req.params.productId;

  Product.findByPk(id).then((product) =>
    res.render("admin/edit-product", {
      product,
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editing: editMode,
    })
  );
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(id, title, imageUrl, description, price);

  updatedProduct.save();

  return res.redirect("/");
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.destroy({ where: { id: id } }).then(() => res.redirect("/"));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
