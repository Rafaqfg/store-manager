const httpStatus = require('../utils/httpStatus');
const { listAllProducts, listIdProduct } = require('../services/productsService');

const productsController = {
  /** @type {import('express').RequestHandler} */

  async listAllProducts(_req, res) {
    const products = await listAllProducts();
    res.status(httpStatus.OK).json(products);
  },

  async listIdProduct(req, res) {
    const { id } = req.params;
    const product = await listIdProduct(id);
    if (product.length > 0) {
      return res.status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' }); 
    }
    res.status(httpStatus.OK).json(product);
  },
};

module.exports = productsController;