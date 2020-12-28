const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    return db.execute(
      "insert into products(title,price,imageUrl,description) values(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("select * from products");
  }

  static fetchOne(id) {
    return db.execute("select * from products where id = ?", [id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM products WHERE (id = ?)", [id]);
  }
};
