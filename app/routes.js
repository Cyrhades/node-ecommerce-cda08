let errorsHTTP = require('./errorsHTTP.js')();
module.exports = (app) => {
    
    app.route('/')
        .get((req, res) => {
            let Controller = require('../src/controllers/Home.js');
            (new Controller).index(req, res);
        })
        .all(errorsHTTP.error405);

    app.route('/inscription')
        .get((req, res) => {
            let Controller = require('../src/controllers/Register.js');
            (new Controller).index(req, res);
        })
        .post((req, res) => {
            let Controller = require('../src/controllers/Register.js');
            (new Controller).form(req, res);
        })
        .all(errorsHTTP.error405);


    app.route('/connexion')
        .get((req, res) => {
            let Controller = require('../src/controllers/Authenticated.js');
            (new Controller).index(req, res);
        })
        .post((req, res) => {
        let Controller = require('../src/controllers/Authenticated.js');
        (new Controller).form(req, res);
        })
        .all(errorsHTTP.error405);

    app.route('/deconnexion')
        .get((req, res) => {
            let Controller = require('../src/controllers/Authenticated.js');
            (new Controller).disconnect(req, res);
        })
        .all(errorsHTTP.error405);


    app.route('/admin')
        .get((req, res) => {
            let Controller = require('../src/controllers/Admin.js');
            (new Controller).index(req, res);
        })
        .all(errorsHTTP.error405);

    app.route('/admin/product')
        .get((req, res) => {
            let Controller = require('../src/controllers/AdminProduct.js');
            (new Controller).index(req, res);
        })
        .all(errorsHTTP.error405);


    app.route('/admin/product/add')
        .get((req, res) => {
            let Controller = require('../src/controllers/AdminProduct.js');
            (new Controller).add(req, res);
        })
        .post((req, res) => {
            let Controller = require('../src/controllers/AdminProduct.js');
            (new Controller).form(req, res);
        })
        .all(errorsHTTP.error405);

    app.route('/admin/product/delete/:id')
        .get((req, res) => {
            let Controller = require('../src/controllers/AdminProduct.js');
            (new Controller).delete(req, res);
        })
        .all(errorsHTTP.error405);

    
    app.route('/admin/user')
        .get((req, res) => {
            let Controller = require('../src/controllers/AdminUser.js');
            (new Controller).index(req, res);
        })
        .all(errorsHTTP.error405);
     

    
    app.route('/admin/user/delete/:id')
        .get((req, res) => {
            let Controller = require('../src/controllers/AdminUser.js');
            (new Controller).delete(req, res);
        })
        .all(errorsHTTP.error405);


    app.route("*").all(errorsHTTP.error404);
};