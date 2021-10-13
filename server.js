const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config.js');
const mongoose = require('mongoose');

//--------------------------------------------------------------------
//      Connexion au server MongoDB
//--------------------------------------------------------------------
mongoose.connect(
    `mongodb+srv://${config.db.user}:${config.db.pwd}@${config.db.cluster}.mongodb.net/${config.db.dbname}`,
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
 
//--------------------------------------------------------------------
// Middleware opermettant de passer des informations à toutes les vues
//--------------------------------------------------------------------
app.use((req, res, next) => { 
    // envoi la route courante à la vue
    res.locals.route = req._parsedUrl.pathname;
    // envoi les sessions à la vue
    res.locals.session = req.session; 
    next();
});

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 

//--------------------------------------------------------------------
//      Parser requete HTTP en POST
//--------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes.js')(app);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port_http,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port_http}` );
});
