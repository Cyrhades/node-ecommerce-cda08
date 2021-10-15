const ProductMongo = require('./ProductMongoDB.js');
 
module.exports = class Product {
 
    add(title, description, price) {
        return ProductMongo.create({title, description, price, photos : []});
    }

    async getAll() {
        return await ProductMongo.find();
    }

    async delete(id) {
        return await ProductMongo.deleteOne({_id : id});
    }
}
