const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

require('dotenv').config()

const app = express();

//MIDDLEWARES PROPIOS
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// RUTAS
const rutaHome = require('./routes/home');
const rutaProduct = require('./routes/products');
const rutaCart = require('./routes/cart');
const rutaUsers = require('./routes/users');

// RUTAS APIs
const apiProducts = require('./routes/api/productsApi');
const apiUsers = require('./routes/api/usersApi');

// MIDDLEWARES
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(methodOverride('_method'));

app.use(cookies());

//MIDDLEWARES PROPIOS INICIALIZACION
app.use(userLoggedMiddleware);

// RUTEO
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})

app.use('/', rutaHome);

app.use('/', rutaProduct);

app.use('/', rutaCart);

app.use('/', rutaUsers);

app.use('/', apiProducts)

app.use('/', apiUsers)

app.use((req, res)=>{
    res.status(404).render('error404');
});