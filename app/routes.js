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
};