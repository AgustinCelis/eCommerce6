const express = require('express')
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController.js');

const adminMiddleware = require('../../middlewares/adminMiddleware.js');

router.get('/api/users', usersAPIController.list)

module.exports = router;