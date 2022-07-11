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

};

module.exports = productsServices;