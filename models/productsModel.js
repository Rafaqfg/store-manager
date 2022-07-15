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

  async addProduct(name) {
    const insert = 'INSERT INTO products (name) VALUES (?);';
    const [{ insertId }] = await db.query(insert, [name]);
    const newProduct = {
      id: insertId,
      name,
    };
    return newProduct;
  },

  async updateProduct(id, name) {
    const update = `
      UPDATE
      products SET
      name = ?
      WHERE
      id = ?;
      `;
    const [response] = await db.query(update, [name, id]);
    return !!response;
  },

  async deleteProduct(id) {
    const deleteQuery = 'DELETE FROM products WHERE id = ?;';
    const deleted = await db.query(deleteQuery, [id]);
    return !!deleted;
  },

  async listProductsByName(q) {
    const select = 'SELECT * FROM products WHERE name LIKE ?;';
    const [products] = await db.query(select, [`%${q}%`]);
    return products;
  },
};

module.exports = productsModel;