const mongoose = require('mongoose');
const { ProductSchema } = require('./product');

const { Schema } = mongoose;

const ShoppingListSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    max: 100,
    validate: {
      validator(v) {
        ShoppingList.find({ name: v }, function(err, docs) {
          return docs.length === 0;
        });
      },
      msg: 'Shopping list already exists!'
    }
  },
  products: [ProductSchema]
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
module.exports = ShoppingList;
