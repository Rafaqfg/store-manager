const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.get('/search', productsControllers.listProductsByName);
productsRoute.get('/:id', productsControllers.listIdProduct);
productsRoute.put('/:id', productsControllers.updateProduct);
productsRoute.delete('/:id', productsControllers.deleteProduct);
productsRoute.get('/', productsControllers.listAllProducts);
productsRoute.post('/', productsControllers.addProduct);

module.exports = productsRoute;