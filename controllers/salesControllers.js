const httpStatus = require('../utils/httpStatus');
const salesServices = require('../services/salesServices');

const salesControllers = {
  /** @type {import('express').RequestHandler} */

  async createSale(req, res) {
    const sale = req.body;
    await salesServices.saleIsValid(sale);
    const validateId = (await salesServices.validateId(sale))
      .every((item) => (item.length > 0));
    if (!validateId) throw new Error('Product not found');
    
    const newSale = await salesServices.createSale(sale);
    res.status(httpStatus.CREATED).json(newSale);
  },
};

module.exports = salesControllers;