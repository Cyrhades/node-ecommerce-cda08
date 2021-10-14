const ProductMongo = require('./ProductMongoDB.js');
 
module.exports = class Product {
 
    add(tilte, description, price) {
        return ProductMongo.create({tilte, description, price, photos : []});
    }
}
