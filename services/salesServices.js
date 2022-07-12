const Joi = require('joi');
const { runSchema } = require('../utils/validators');
const salesModel = require('../models/salesModel');

const salesServices = {

  validateSale: runSchema(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  })),

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