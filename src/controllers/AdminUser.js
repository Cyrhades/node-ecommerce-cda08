const UserModel = require('../models/User');
module.exports = class AdminUser {

    index(req, res) {
        (new UserModel).getAll().then((users) => {
            res.render('admin/user/list', { users } );
        })
    }


    delete(req, res) {
        (new UserModel).delete(req.params.id).then(() => {
            res.redirect('/admin/user');
        });
    }
}