const httpStatus = require('../utils/httpStatus');
const productsServices = require('../services/productsServices');

const productsControllers = {
  /** @type {import('express').RequestHandler} */

  async listAllProducts(_req, res) {
    const products = await productsServices.listAllProducts();
    res.status(httpStatus.OK).json(products);
  },

  async listIdProduct(req, res) {
    const { params: { id } } = req;
    const [product] = await productsServices.listIdProduct(id);
    if (!product) {
      return res.status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' }); 
    }
    res.status(httpStatus.OK).json(product);
  },

  async addProduct(req, res) {
    const { body } = req;
    const { name } = await productsServices.validateName(body);
    const newProduct = await productsServices.addProduct(name);
    res.status(httpStatus.CREATED).json(newProduct);
  },

  async updateProduct(req, res) {
    const { params: { id } } = req;
    const { body } = req;
    await productsServices.productExist(id);
    await productsServices.validateName(body);
    const [productUpdated] = await productsServices.updateProduct(id, body.name);
    res.status(httpStatus.OK).json(productUpdated);
  },

  async deleteProduct(req, res) {
    const { params: { id } } = req;
    await productsServices.productExist(id);
    await productsServices.deleteProduct(id);
    res.status(httpStatus.NO_CONTENT).send();
  },

  async listProductsByName(req, res) {
    const { query: { q } } = req;
    if (!q) {
      const products = await productsServices.listAllProducts();
      return res.status(httpStatus.OK).json(products);
    }
    await productsServices.validateName({ name: q });
    const products = await productsServices.listProductsByName(q);
    res.status(httpStatus.OK).json(products);
  },
};

module.exports = productsControllers;