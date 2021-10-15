const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price : {  type: Number },
    photos : { type: Array },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema); 