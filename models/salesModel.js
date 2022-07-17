const db = require('./db');

const salesModel = {

  async createSale(saleId, productId, quantity) {
    const insert = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    const result = await db.query(insert, [saleId, productId, quantity]);
    return result;
  },

  async addSaleId() {
    const insert = 'INSERT INTO sales (date) VALUES (now());';
    const [{ insertId }] = await db.query(insert);
    return insertId;
  },

  async getAllSalesList() {
    const select = `
      SELECT
      sale.id AS saleId,
      sale.date,
      salesProducts.product_id AS productId,
      salesProducts.quantity
      FROM sales_products AS salesProducts
      JOIN sales AS sale
      ON sale.id = salesProducts.sale_id
    `;
    const [sales] = await db.query(select);
    return sales;
  },

  async getSaleById(id) {
    const select = `
      SELECT
      sale.date,
      salesProducts.product_id AS productId,
      salesProducts.quantity
      FROM sales_products AS salesProducts
      JOIN sales AS sale
      ON sale.id = salesProducts.sale_id
      WHERE sale.id = ?
    `;
    const [sale] = await db.query(select, [id]);
    return sale;
  },

  async deleteSale(id) {
    const deleteQuery = 'DELETE FROM sales WHERE id = ?;';
    const deleted = await db.query(deleteQuery, [id]);
    return !!deleted;
  },

  async updateSale(id, sale) {
    const update = `
      UPDATE StoreManager.sales_products SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;
    `;
    await Promise.all(sale.map(async (product) => {
      await db.query(update, [product.quantity, id, product.productId]);
    }));
  },
};

module.exports = salesModel;