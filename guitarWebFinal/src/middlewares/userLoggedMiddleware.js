const db = require("../database/models");
const {
    Op
} = require('sequelize');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    };

    let userInCookie = req.cookies.email;

    if (userInCookie) {
        let userFromCookie = await db.Users.findOne({
                where: {
                    [Op.or]: [{
                            username: userInCookie
                        },
                        {
                            email: userInCookie
                        }
                    ]
                }
            })
            .then(user => {
                if (user != null) {
                    return {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                        role_id: user.role_id
                    };
                }
            })
            .catch(error => console.log(error));


        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
            res.locals.userLogged = req.session.userLogged;
        };
    }

    next();
};

module.exports = userLoggedMiddleware;