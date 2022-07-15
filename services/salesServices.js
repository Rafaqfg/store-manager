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

  async getAllSalesList() {
    const salesList = await salesModel.getAllSalesList();
    return salesList;
  },

  async getSaleById(id) {
    const sale = await salesModel.getSaleById(id);
    if (sale.length === 0) {
      throw new Error('Sale not found');
    }
    const saleById = sale.map((item) => {
      const response = {
        date: item.date,
        productId: item.productId,
        quantity: item.quantity,
      };
      return response;
    });
    return saleById;
  },

  async saleExist(id) {
    const sale = await this.getSaleById(id);
    return !!sale;
  },

  async deleteSale(id) {
    const deleted = await salesModel.deleteSale(id);
    return !!deleted;
  },
};

module.exports = salesServices;