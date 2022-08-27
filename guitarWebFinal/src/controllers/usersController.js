const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {Op} = require('sequelize')
const db = require('../database/models');

const controller = {
    showLogin: function (req, res) {
        return res.status(200).render('users/login');
    },
    processLogin: async function (req, res) {
        let userToLogin = await db.Users.findOne({
                where: {
                    [Op.or]: [{
                            username: req.body.username
                        },
                        {
                            email: req.body.username
                        }
                    ]
                }
            })
            .then(user => {
                if (user != null) {
                    if ((req.body.username).toLowerCase() == (user.email).toLowerCase() || (req.body.username).toLowerCase() == (user.username).toLowerCase()) {
                        return user;
                    }
                }
            });

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.remember_user) {
                    res.cookie('email', userToLogin.email, {
                        maxAge: 1000 * 86400
                    });
                };
                return res.redirect('/');
            };
            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'Credenciales invalidas'
                    }
                },
                oldData: req.body
            });
        };

        return res.render('users/login', {
            errors: {
                username: {
                    msg: "Este email no esta registrado"
                },
            },
            oldData: req.body
        });
    },
    showRegister: function (req, res) {
        return res.status(200).render('users/register');
    },
    processRegister: async function (req, res) {
        let resultValidation = validationResult(req);

        let userInDb = await db.Users.findOne({ // BUSQUEDA DE USUARIO EN DB
                where: {
                    username: (req.body.username).toLowerCase()
                }
            })
            .then(user => {
                if (user != null) {
                    return user
                }
            });

        let emailInDb = await db.Users.findOne({ // BUSQUEDA DE USUARIO EN DB
                where: {
                    email: (req.body.email).toLowerCase()
                }
            })
            .then(email => {
                if (email != null) {
                    return email
                }
            });

        if (userInDb) { //Aca se aclara que el usuario ya existe
            resultValidation.errors.push({
                value: req.body.username,
                msg: 'Este usuario ya existe',
                param: 'username',
                location: 'body'
            });
        };

        if (emailInDb) { //Aca se aclara que el email ya existe
            resultValidation.errors.push({
                value: req.body.email,
                msg: 'Este email ya existe',
                param: 'email',
                location: 'body'
            });
        };

        if (req.body.password != req.body.confirm_password) { //Incongruencia en contrasenas
            resultValidation.errors.push({
                value: req.body.password,
                msg: 'Las contraseñas no coinciden',
                param: 'password',
                location: 'body'
            });
        };

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        };

        let userToRegister = {
            username: (req.body.username).toLowerCase(),
            email: (req.body.email).toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: 'default.png',
            role_id: 1,
            active: 1,
        };

        db.Users.create(userToRegister);

        delete userToRegister.password
        delete userToRegister.active

        req.session.userLogged = userToRegister;

        res.cookie('email', req.body.email, {
            maxAge: 1000 * 86400
        });

        return res.redirect('/');
    },
    showProfile: function (req, res) {
        db.Users.findByPk(req.session.userLogged.id)
            .then(user => {
                res.render('users/profile', {
                    user
                })
            })
    },
    logout: function (req, res) {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },
};

module.exports = controller;