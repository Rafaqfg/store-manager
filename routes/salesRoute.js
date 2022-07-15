const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRoute = Router();

salesRoute.delete('/:id', salesControllers.deleteSale);
salesRoute.get('/:id', salesControllers.getSaleById);
salesRoute.put('/:id', salesControllers.updateSale);
salesRoute.post('/', salesControllers.createSale);
salesRoute.get('/', salesControllers.getAllSalesList);

module.exports = salesRoute;