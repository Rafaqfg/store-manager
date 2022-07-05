const httpStatus = require('../utils/httpStatus');
const productsService = require('../services/productsService');

const productsControllers = {
  /** @type {import('express').RequestHandler} */

  async listAllProducts(_req, res) {
    const products = await productsService.listAllProducts();
    res.status(httpStatus.OK).json(products);
  },

  async listIdProduct(req, res) {
    const { id } = req.params;
    const [product] = await productsService.listIdProduct(id);
    if (!product) {
      return res.status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' }); 
    }
    res.status(httpStatus.OK).json(product);
  },
};

module.exports = productsControllers;