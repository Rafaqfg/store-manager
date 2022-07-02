const httpStatus = require('../utils/httpStatus');
const { listAllProducts, listIdProduct } = require('../services/productsService');

const productsController = {
  /** @type {import('express').RequestHandler} */

  async listAllProducts(_req, res) {
    const products = await listAllProducts();
    res.status(httpStatus.OK).json(products);
  },

  async listIdProduct(req, _res) {
    const { id } = req.params;
    const product = await listIdProduct(id);
    console.log(product);
  },
};

module.exports = productsController;