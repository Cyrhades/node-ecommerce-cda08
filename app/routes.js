module.exports = (app) => {
    app.get('/', (req, res) => {
        let Controller = require('../src/controllers/Home.js');
        (new Controller).index(req, res);
    });

    app.get('/inscription', (req, res) => {
        let Controller = require('../src/controllers/Register.js');
        (new Controller).index(req, res);
    });
    app.post('/inscription', (req, res) => {
        let Controller = require('../src/controllers/Register.js');
        (new Controller).form(req, res);
    });


    app.get('/connexion', (req, res) => {
        let Controller = require('../src/controllers/Authenticated.js');
        (new Controller).index(req, res);
    });
    app.post('/connexion', (req, res) => {
        let Controller = require('../src/controllers/Authenticated.js');
        (new Controller).form(req, res);
    });

    app.get('/deconnexion', (req, res) => {
        let Controller = require('../src/controllers/Authenticated.js');
        (new Controller).disconnect(req, res);
    });


    app.get('/admin', (req, res) => {
        let Controller = require('../src/controllers/Admin.js');
        (new Controller).index(req, res);
    });

    app.get('/admin/product', (req, res) => {
        let Controller = require('../src/controllers/AdminProduct.js');
        (new Controller).index(req, res);
    });

    app.get('/admin/product/add', (req, res) => {
        let Controller = require('../src/controllers/AdminProduct.js');
        (new Controller).add(req, res);
    });
    app.post('/admin/product/add', (req, res) => {
        let Controller = require('../src/controllers/AdminProduct.js');
        (new Controller).form(req, res);
    });
};