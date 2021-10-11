module.exports = (app) => {
    app.get('/', (req, res) => {
        let Controller = require('../src/controllers/Home.js');
        (new Controller).print(req, res);
    });

    app.get('/inscription', (req, res) => {
        let Controller = require('../src/controllers/Register.js');
        (new Controller).print(req, res);
    });
};