const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.listAllProducts);
productsRoute.get('/:id', productsController.listIdProduct);

module.exports = productsRoute;