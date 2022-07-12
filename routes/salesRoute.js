const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRoute = Router();

salesRoute.post('/', salesControllers.createSale);

module.exports = salesRoute;