const express = require('express')
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController.js');

const adminMiddleware = require('../../middlewares/adminMiddleware.js');

router.get('/api/products',productsAPIController.list)

router.get('/api/products/:id', productsAPIController.showOne)

module.exports = router;