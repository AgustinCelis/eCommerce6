const db = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator')

const controller = {
    // VISTA DE DETALLE DE PRODUCTOS
    showDetail: function (req, res) {
        db.Products.findByPk(req.params.id,{
            include:{
                association: "categories",
                association: "subcategories"
            },
        })
            .then(product => {
                product != null ? res.status(200).render('products/detail', {
                    product
                }) : res.status(404).render('error404')
            });
    },
    // VISTA PIVOT DE CREACION DE PRODUCTOS
    showPivotCreate: function (req, res) {
        db.Categories.findAll()
            .then(categories => {
                categories != null ? res.status(200).render('products/create', {
                    categories
                }) : res.status(404).render('error404');
            });
    },
    showCreateProduct: function (req, res) {
        db.Categories.findByPk(req.params.id, {
                include: {
                    association: "subcategories"
                }, // Aca hacer un include para traer las subcategorias y ponerlas en un select
            })
            .then(category => {
                category != null ? res.status(200).render('products/genericCreatingForm', {
                    category,
                    id: req.params.id,
                }) : res.status(404).render('error404');
            })
            .catch(error => console.log(error))
    },
    // CREACION DE PRODUCTOS
    processCreateProduct: async function (req, res) {
        // TRABAJAR ACA LAS VALIDACIONES DE BACKEND DE CREACION DE PRODUCTO
        let resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){

            let category = await db.Categories.findByPk(req.params.id, {
                include: {
                    association: "subcategories"
                }, // Aca hacer un include para traer las subcategorias y ponerlas en un select
            })
            .then(category => {
                return category
            })
            .catch(error => console.log(error))

            return res.render("products/genericCreatingForm", {
                errors: resultValidation.mapped(),
                oltData: req.body,
                category,
                id: req.params.id,
            })
        }

        let productToCreate = {
            categ_id: req.params.id,
            subcateg_id: req.body.subcategory,
            name: req.body.name,
            image_1: "default1.png",
            image_2: "default2.png",
            image_3: "default3.png",
            image_4: "default4.png",
            description: req.body.description,
            price: req.body.price,
            available_amount: req.body.available_amount,
            active: 1
        };

        await db.Products.create(productToCreate);

        let productRedirect = await db.Products.findOne({
            where: {
                name: req.body.name,
            }
        })
        .then(product => {
            return product
        })

        return res.redirect(`/products/detail/${productRedirect.id}`)
    },
    // VISTA DE EDICION DE PRODUCTOS
    showEditProduct: function (req, res) {
        db.Products.findByPk(req.params.id)
        .then(product => {
            product != null ? res.status(200).render('products/edit', {product}) : res.status(404).render('error404')
        });
    },
    // EDICION DE PRODUCTOS
    processEditProduct: function (req, res) {
        return res.redirect('/')
        // TRABAJAR ACA LAS VALIDACIONES DE BACKEND DE EDICION DE PRODUCTO
    },
    // VISTA DE LISTADO DE PRODUCTOS
    showMainList: async function (req, res) {
        if(req.params && req.params.id){
            let products = await db.Products.findAll({
                include: [{
                    association: 'categories'
                },
                {
                    association: 'subcategories'
                }
            ],
            where: {
                categ_id: req.params.id
            }})
                .then(products => {
                    return products
                })

            if(products.length == 0){
                return res.status(404).render('error404')
            }
    
            return res.status(200).render('products/mainList', {
                products
            });
        }

        let products = await db.Products.findAll({
            include: [{
                association: 'categories'
            },
            {
                association: 'subcategories'
            }
        ]
        })
            .then(products => {
                return products
            })

        return res.status(200).render('products/mainList', {
            products
        });
    },
    // VISTA DE ELIMINACION DE PRODUCTOS
    showDeleteProduct: async function (req, res) {
        let product = await db.Products.findByPk(req.params.id)
        .then(product =>{
            return product
        })

        return res.status(200).render('products/delete', {
            product,
            idProduct: req.params.id
        })
    },
    // SUPRESION DE PRODUCTOS
    processDelete: async function (req, res) {
        await db.Products.update({
            active: 0
        }, {
            where: {
                id: req.params.id
            }
        })

        return res.redirect('/home')
    },
};

module.exports = controller;