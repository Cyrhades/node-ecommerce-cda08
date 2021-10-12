const UserModel = require('../models/User');
module.exports = class  {

    index(req, res) {
        res.render('user/register');
    }

    form(req, res) {
        const re =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let error = null;
        if(typeof req.body != 'undefined') {
            if(typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined' ||
               typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined' )
            {
                error = `Veuillez remplir tous les champs.`;
            }
            else if(typeof req.body.firstname !== 'string' || req.body.firstname.length > 60 ||
                    typeof req.body.lastname !== 'string' || req.body.lastname.length > 60) {
                    error = `La longueur maximum autorisé pour vos nom / prénom est de 60 caractères`;
            }
            else if(typeof req.body.email !== 'string' || !re.test(req.body.email))  {
                error = 'Votre adresse email n\'est pas correcte';
            } 
            if(!error)  {
                let User = new UserModel();
                User.emailExists(req.body.email).then((result) => {
                    if(result !== false) {
                        res.render('user/register',{
                            error: `Cette adresse email est déjà utilisée.`,
                            lastname : req.body.lastname,
                            firstname : req.body.firstname,
                            email : req.body.email
                        });
                    }
                    else {
                        User.add(req.body.lastname, req.body.firstname, req.body.email, req.body.password)
                        // @todo message dans flashbag
                         
                        // redirection vers l'accueil
                        res.redirect('/');
                        return;                       
                    }
                });               
            } else {
                res.render('user/register',{
                    error: error,
                    lastname : req.body.lastname,
                    firstname : req.body.firstname,
                    email : req.body.email
                });
            }
        } else {
            res.render('user/register',{ error: `Le formulaire n'pas été soumis correctement.` });
        }
    }
}