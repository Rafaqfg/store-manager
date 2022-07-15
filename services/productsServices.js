const Joi = require('joi');
const { runSchema } = require('../utils/validators');
const productsModel = require('../models/productsModel');

const productsServices = {
  async listAllProducts() {
    const products = await productsModel.listAllProducts();
    return products;
  },

  async listIdProduct(ID) {
    const product = await productsModel.listIdProduct(ID);
    return product;
  },

  validateName: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  async addProduct(name) {
    const newProduct = await productsModel.addProduct(name);
    return newProduct;
  },

  async productExist(id) {
    const product = await this.listIdProduct(id);
    if (product.length > 0) {
      return true;
    }
    throw new Error('Product not found');
  },

  async updateProduct(id, name) {
    await productsModel.updateProduct(id, name);
    const productUpdated = this.listIdProduct(id);
    return productUpdated;
  },

  async deleteProduct(id) {
    const deleted = await productsModel.deleteProduct(id);
    return !!deleted;
  },

  async listProductsByName(q) {
    const products = await productsModel.listProductsByName(q);
    return products;
  },
};

module.exports = productsServices;