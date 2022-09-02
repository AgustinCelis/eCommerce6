const db = require('../../database/models');

const controller = {
    'list': (req, res) => {
        db.Users
            .findAll({
                include: [{association: "roles"}]
            })
            .then(users => {
                let response = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: 'api/users'
                    },
                    data: users
                }

                return res.json(response)
            })
    }
}

module.exports = controller;