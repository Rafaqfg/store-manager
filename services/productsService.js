const productModel = require('../models/productsModel');

const productsService = {
  async listAllProducts() {
    const products = await productModel.listAllProducts();
    return products;
  },

  async listIdProduct(ID) {
    const product = await productModel.listIdProduct(ID);
    return product;
  },
};

module.exports = productsService;