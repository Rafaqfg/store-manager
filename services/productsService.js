const Joi = require('joi');
const { runSchema } = require('../utils/validators');
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

  validateName: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  async addProduct(name) {
    const newProduct = await productModel.addProduct(name);
    return newProduct;
  },

};

module.exports = productsService;