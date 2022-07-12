const db = require('./db');

const salesModel = {

  async createSale(saleId, productId, quantity) {
    const insert = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    await db.query(insert, [saleId, productId, quantity])
  },

  async addSaleId() {
    const insert = 'INSERT INTO sales (date) VALUES (now());';
    const [{ insertId }] = await db.query(insert);
    return insertId;
  },
};

module.exports = salesModel;