const httpStatus = require('../utils/httpStatus');
const productsService = require('../services/productsService');

const productsControllers = {
  /** @type {import('express').RequestHandler} */

  async listAllProducts(_req, res) {
    const products = await productsService.listAllProducts();
    res.status(httpStatus.OK).json(products);
  },

  async listIdProduct(req, res) {
    const { params: { id } } = req;
    const [product] = await productsService.listIdProduct(id);
    if (!product) {
      return res.status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' }); 
    }
    res.status(httpStatus.OK).json(product);
  },

  async addProduct(req, res) {
    const { body: { name } } = req;
    const newProduct = await productsService.addProduct(name);
    if (!newProduct) {
      return res.status(httpStatus.SERVER_ERROR)
        .json({ message: 'error' });
    }
    res.status(httpStatus.CREATED).json(newProduct);
  },
};

module.exports = productsControllers;