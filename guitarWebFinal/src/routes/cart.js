const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware.js');

const cartsController = require('../controllers/cartsController');

router.get('/cart', authMiddleware, cartsController.showCart);
router.post('/cart/push/:id', authMiddleware, cartsController.pushToCart);
router.delete('/cart/delete/:id', authMiddleware, cartsController.deleteFromCart)
router.patch('/cart/add/:id', authMiddleware, cartsController.addAmount);
router.patch('/cart/subs/:id', authMiddleware, cartsController.subsAmount)

router.get('/cart/pay', authMiddleware, cartsController.showOrder);
router.post('/cart/pay', authMiddleware, cartsController.ordering);

module.exports = router;