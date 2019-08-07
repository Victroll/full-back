const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpensesShoppingListSchema = new Schema({
  owner: {
    type: String,
    required: true,
    max: 100
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model(
  'ExpensesShoppingList',
  ExpensesShoppingListSchema
);
