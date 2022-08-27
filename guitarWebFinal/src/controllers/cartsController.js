const db = require('../database/models');
const {
    Op
} = require('sequelize');

const {
    validationResult
} = require('express-validator');

const controller = {
    showCart: function (req, res) {
        if (req.session && req.session.userLogged) {
            db.Carts.findAll({
                    where: {
                        user_id: req.session.userLogged.id
                    },
                    include: [{
                            association: 'products'
                        },
                        {
                            association: 'users'
                        }
                    ]
                })
                .then(cart => {
                    let totales = [];

                    for (let i = 0; i < cart.length; i++) {
                        totales.push(cart[i].price * cart[i].amount);
                    };

                    let total = totales.reduce((a, b) => a + b, 0);

                    return res.status(200).render('cart', {
                        cart,
                        total
                    });
                });
        };
    },
    pushToCart: async function (req, res) {
        let productInCart = await db.Carts.findOne({
                where: {
                    user_id: req.session.userLogged.id,
                    product_id: req.params.id
                }
            })
            .then(productCart => {
                return productCart
            });

        let product = await db.Products.findByPk(req.params.id)
            .then(product => {
                return product
            });

        let productoToPush = {
            user_id: req.session.userLogged.id,
            product_id: product.id,
            amount: req.body.amount,
            price: product.price,
            total: product.price * req.body.amount
        }
        if (productInCart) {
            return res.redirect('/cart')
        } else {
            await db.Carts.create(productoToPush)
        }
        return res.redirect('/cart')
    },
    deleteFromCart: async function (req, res) {
        await db.Carts.destroy({
            where: {
                [Op.and]: [{
                        user_id: req.session.userLogged.id
                    },
                    {
                        product_id: req.params.id
                    }
                ]
            }
        });
        return res.redirect('/cart')
    },
    addAmount: async function (req, res) {
        let productInCart = await db.Carts.findOne({
            where: {
                [Op.and]: [{
                        user_id: req.session.userLogged.id
                    },
                    {
                        product_id: req.params.id
                    }
                ]
            }
        }).then(product => {
            return product
        })

        if (productInCart.amount >= req.query.maxAmount) {
            return res.redirect('/cart')
        } else {
            await db.Carts.increment({
                amount: 1
            }, {
                where: {
                    [Op.and]: [{
                            user_id: req.session.userLogged.id
                        },
                        {
                            product_id: req.params.id
                        }
                    ]
                }
            });

            return res.redirect('/cart');
        }


    },
    subsAmount: async function (req, res) {
        if (req.body.amount <= 1) {
            return res.redirect('/cart')
        } else {
            await db.Carts.decrement({
                amount: 1
            }, {
                where: {
                    [Op.and]: [{
                            user_id: req.session.userLogged.id
                        },
                        {
                            product_id: req.params.id
                        }
                    ]
                }
            });

            let cart = await db.Carts.findOne({
                    where: {
                        user_id: req.session.userLogged.id,
                        product_id: req.params.id
                    }
                })
                .then(cart => {
                    return cart
                })

            await db.Carts.update({
                total: cart.amount * cart.price
            }, {
                where: {
                    user_id: req.session.userLogged.id,
                    product_id: req.params.id
                }
            });

            return res.redirect('/cart');
        }
    },
    showOrder: async function (req, res) {
        let order = await db.Orders.findOne({
                order: [
                    ['id', 'DESC']
                ],
                where: {
                    user_id: req.session.userLogged.id
                }
            })
            .then(order => {
                return order
            });

        return res.render('order', {
            order
        })
    },
    ordering: async function (req, res) {
        let totals = await db.Carts.findAll({
                where: {
                    user_id: req.session.userLogged.id
                }
            })
            .then(totals => {
                let preTotals = []
                for (let i = 0; i < totals.length; i++) {
                    preTotals.push(totals[i].total)
                }
                return preTotals
            });

        let orderToCreate = {
            user_id: req.session.userLogged.id,
            total: totals.reduce((a, b) => a + b, 0)
        };

        if (totals != 0) {
            db.Orders.create(orderToCreate)
        } else {
            return res.redirect('/cart')
        }

        db.Carts.destroy({
            where: {
                user_id: req.session.userLogged.id
            }
        });

        return res.redirect('/cart/pay')
    },
};

module.exports = controller;