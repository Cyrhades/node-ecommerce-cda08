const UserModel = require('../models/User');
module.exports = class Authenticated {

    index(req, res) {
        res.render('user/authenticated');
    }

    form(req, res) {
        let error = null;
        if(typeof req.body != 'undefined') {
            if(typeof req.body.email === 'undefined' || typeof req.body.email !== 'string' )  {
                error = `Votre adresse email n'est pas correcte`;
            } 
            else  if(typeof req.body.password === 'undefined' || typeof req.body.password !== 'string' )  {
                error = `Votre mot de passe ne peut pas être vide`;
            } 
            if(!error)  {
                let User = new UserModel();
                User.findByEmail(req.body.email).then((user) => {
                    if (!user) {
                        res.render('user/authenticated',{ error: `Votre adresse email n'est pas reconnue`});
                    } else {
                        let bcrypt = require('bcryptjs');
                        if(bcrypt.compareSync(req.body.password, user.password)) {
                            res.render('user/authenticated',{ error: `Votre mot de passe est incorrect` });
                        } else {
                            user.password = null;
                            req.session.user = user;
                            req.flash('success', 'Vous êtes maintenant connecté');
                            res.redirect('/');
                        }
                    }
                });               
            } else {
                res.render('user/authenticated',{
                    error: error,
                    email : req.body.email
                });
            }
        } else {
            res.render('user/register',{ error: `Le formulaire n'pas été soumis correctement.` });
        }
    }

    disconnect(req, res) {
        if(typeof req.session.user != 'undefined') {
            req.session.user = null;
        }
        req.flash('error', 'Vous êtes maintenant déconnecté');
        res.redirect('/');
    }
}