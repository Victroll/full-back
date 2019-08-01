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

// Module.exports = mongoose.model('Product', ProductSchema);
module.exports = ProductSchema;
