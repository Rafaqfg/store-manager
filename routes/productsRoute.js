const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.get('/:id', productsControllers.listIdProduct);
productsRoute.put('/:id', productsControllers.updateProduct);
productsRoute.get('/', productsControllers.listAllProducts);
productsRoute.post('/', productsControllers.addProduct);

module.exports = productsRoute;