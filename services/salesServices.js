const Joi = require('joi');
const { runSchema } = require('../utils/validators');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const salesServices = {

  validateSale: runSchema(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required().min(1),
  })),

  async validateId(arr) {
    const exists = await Promise.all(
      arr.map((item) => (
        productsModel.listIdProduct(item.productId)
      )),
    );
    return exists;
  },

  async saleIsValid(arr) {
    const isValid = await Promise.all(
      arr.map((item) => (
        this.validateSale(item)
      )),
    );
    return isValid;
  },

  async createSale(sale) {
    const saleId = await salesModel.addSaleId();
    await Promise.all(sale.map((product) =>
      salesModel.createSale(saleId, product.productId, product.quantity)));
    const newSale = {
      id: saleId,
      itemsSold: sale,
    };
    return newSale;
  },
};

module.exports = salesServices;