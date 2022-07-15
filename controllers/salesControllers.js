const httpStatus = require('../utils/httpStatus');
const salesServices = require('../services/salesServices');

const salesControllers = {
  /** @type {import('express').RequestHandler} */

  async getAllSalesList(_req, res) {
    const salesList = await salesServices.getAllSalesList();
    res.status(httpStatus.OK).json(salesList);
  },

  async getSaleById(req, res) {
    const { params: { id } } = req;
    const sale = await salesServices.getSaleById(id);
    res.status(httpStatus.OK).json(sale);
  },

  async createSale(req, res) {
    const sale = req.body;
    await salesServices.saleIsValid(sale);
    const isValid = (await salesServices.validateId(sale))
      .every((item) => (item.length > 0));
    if (!isValid) throw new Error('Product not found');
    
    const newSale = await salesServices.createSale(sale);
    res.status(httpStatus.CREATED).json(newSale);
  },

  async deleteSale(req, res) {
    const { params: { id } } = req;
    const saleExist = await salesServices.saleExist(id);
    if (saleExist) {
    await salesServices.deleteSale(id);
      return res.status(httpStatus.NO_CONTENT).send();
    }
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
  },
};

module.exports = salesControllers;