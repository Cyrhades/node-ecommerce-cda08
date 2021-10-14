const ProductModel = require('../models/Product');
module.exports = class Home {

    index(req, res) {
        res.render('admin/product/list');
    }

    add(req, res) {
        res.render('admin/product/add');
    }

    form(req, res) {
        let error = null;
        if(typeof req.body != 'undefined') {
            if(typeof req.body.title === 'undefined' || typeof req.body.description === 'undefined' ||
               typeof req.body.price === 'undefined')
            {
                error = `Veuillez remplir tous les champs obligatoires.`;
            }
            else if(typeof req.body.title !== 'string' || req.body.title.length > 160 ||
                    typeof req.body.description !== 'string') {
                    error = `La longueur maximum autorisé pour vos nom / prénom est de 60 caractères`;
            }
            else if(typeof req.body.price <= 0)  {
                error = `Le prix doit être supérieur à 0€`;
            } 
            if(!error)  {
                let Product = new ProductModel();               
                Product.add(req.body.title, req.body.description, req.body.price)
                req.flash('success', 'Le produit a bien été créé');
                res.redirect('/admin/product');
                return;                       
             
            } else {
                res.render('admin/product/add',{
                    error: error,
                    title: req.body.title, 
                    description: req.body.description, 
                    price: req.body.price
                });
            }
        } else {
            res.render('admin/product/add',{ error: `Le formulaire n'pas été soumis correctement.` });
        }
    }
}