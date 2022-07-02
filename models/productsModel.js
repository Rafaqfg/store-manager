const db = require('./db');

const productsModel = {
  async listAllProducts() {
    const select = 'SELECT * FROM products';
    const [products] = await db.query(select);
    return products;
  },

  async listIdProduct(ID) {
    const select = 'SELECT * FROM products WHERE ID = ?';
    const [product] = await db.query(select, ID);
    return product;
  },
};

module.exports = productsModel;