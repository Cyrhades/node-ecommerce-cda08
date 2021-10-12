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
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
 
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
