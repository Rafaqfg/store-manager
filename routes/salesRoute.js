const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRoute = Router();

salesRoute.get('/:id', salesControllers.getSaleById);
salesRoute.delete('/:id', salesControllers.deleteSale);
salesRoute.post('/', salesControllers.createSale);
salesRoute.get('/', salesControllers.getAllSalesList);

module.exports = salesRoute;