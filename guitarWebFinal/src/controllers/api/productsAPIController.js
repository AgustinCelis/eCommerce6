const db = require('../../database/models');

const controller = {
    'list': (req, res) => {
        db.Products
            .findAll({
                include: [{association: "categories"}, {association: "subcategories"}]
            })
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
    },
    'showOne': (req, res) => {
        db.Products
            .findByPk(req.params.id, {
                include: [{association: "categories"}, {association: "subcategories"}]
            })
            .then(product => {
                let response = {
                    meta: {
                        status: 200,
                    },
                    data: product
                }

                if(response.data != null){
                    return res.json(response)
                }else{
                    return res.send(`No existe el producto con id ${req.params.id}`)
                }
            })
    },
}

module.exports = controller;