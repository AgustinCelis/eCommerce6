const db = require('../../database/models');

const controller = {
    'list': (req, res) => {
        db.Users
            .findAll()
            .then(products => {
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: 'api/products'
                    },
                    data: products
                }

                return res.json(response)
            })
    }
}

module.exports = controller;