const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.get('/', productsControllers.listAllProducts);
productsRoute.get('/:id', productsControllers.listIdProduct);

module.exports = productsRoute;