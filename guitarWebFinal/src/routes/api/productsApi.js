const express = require('express')
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController.js');

router.get('/api/products', productsAPIController.list)

module.exports = router;