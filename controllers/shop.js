const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.fetchOne(prodId).then(([product]) => {
    res.render("shop/product-detail", {
      product: product[0],
      pageTitle: "Product Detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll().then(([products]) => {
      const cartProduct = [];
      for (product of products) {
        const cartProductData = cart.products.find((id) => product.id);
        if (cartProductData)
          cartProduct.push({ productsData: product, qty: cartProductData.qty });
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProduct,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchOne(id).then(([product]) => {
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
