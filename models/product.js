const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const id = this.id;
        const existingProductIndex = products.findIndex(
          (el) => parseInt(el.id) === parseInt(id)
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        console.log(updatedProducts);
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchOne(cb, id) {
    getProductsFromFile((products) => {
      products = products.filter((el) => el.id === id);
      cb(products[0]);
    });
  }

  static delete(id) {
    getProductsFromFile((products) => {
      products = products.filter((el) => parseInt(el.id) !== parseInt(id));
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
};
