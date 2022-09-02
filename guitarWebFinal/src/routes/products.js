const express = require('express');
const path = require('path');
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, `../../public/images/products/${req.params.id}`));
    },
    filename: function(req, file, cb){
        let filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    },
});

const uploadFile = multer({storage: storage});

let subcategories = ['Stratocaster', 
'Telecaster', 
'Paul Reed Smith', 
'Solid Guitar', 
'Les Paul', 
'Superstrat',
'Classic design',
'California',
'Paramount',
'Ukelele',
'Precision',
'Jazz',
'Jaguar',
'Mustang',]

const validations = [
    body('name').notEmpty().withMessage('Tiener que escribir el nombre del producto'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripcion'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio'),
    body('product_images').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.png'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Formato valido, solo se permite ${acceptedExtensions.join(', ')}`);
            };
        }
        return true;
    }),
    body('subcategory').isIn(subcategories).withMessage('Selecciona una subcategoria'),
    body('available_amount').notEmpty().withMessage('Selecciona la cantidad'),
];

// Creacion de productos
router.get('/products/create', productsController.showPivotCreate);
router.get('/products/create/:id', productsController.showCreateProduct);
router.post('/products/create/:id', uploadFile.single('product_images'), validations, productsController.processCreateProduct);

// Edicion de productos
router.get('/products/edit/:id', productsController.showEditProduct);
router.put('/products/edit/:id', uploadFile.any(), productsController.processEditProduct);  

// Detalle de producto
router.get('/products/detail/:id', productsController.showDetail);

// Eliminacion de productos
router.get('/products/delete/:id', productsController.showDeleteProduct);
router.delete('/products/delete/:id', productsController.processDelete);

//Lista de todos los productos
router.get('/products', productsController.showMainList);
router.get('/products/:id?', productsController.showMainList);

module.exports = router;