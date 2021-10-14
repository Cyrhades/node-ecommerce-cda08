const UserMongo = require('./UserMongoDB.js');
 
module.exports = class User {
 
    add(lastname, firstname, email, password) {
        return UserMongo.create({lastname, firstname, email, password});
    }

    
    async emailExists(email) {
        return await UserMongo.findOne({email}) ? true : false;
    }

    async findByEmail(email) {
        return await UserMongo.findOne({email});
    }

    async getAll() {
        return await UserMongo.find();
    }

    async delete(id) {
        return await UserMongo.deleteOne({_id : id});
    }
}
