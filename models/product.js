const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100
  },
  amount: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports.ProductSchema = ProductSchema;
module.exports.Product = Product;
