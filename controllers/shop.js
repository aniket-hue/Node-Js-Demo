const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) =>
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    })
  );
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.findAll().then((products) => {
      const cartProduct = [];
      for (product of products) {
        const cartProductData = cart.products.find((id) => product.id);
        if (cartProductData)
          cartProduct.push({ productsData: product, qty: cartProductData.qty });
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart ",
        products: cartProduct,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id).then((product) => {
    Cart.addProduct(product.id, product.price);
  });
  return res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
