const httpStatus = require('../utils/httpStatus');
const salesServices = require('../services/salesServices');

const salesControllers = {
  /** @type {import('express').RequestHandler} */

  async createSale(req, res) {
    const sale = req.body;
    sale.forEach((item) => {
      salesServices.validateSale(item);
    });
    const newSale = await salesServices.createSale(sale);
    res.status(httpStatus.CREATED).json(newSale);
  }

}

module.exports = salesControllers;