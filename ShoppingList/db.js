import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/full-back');

const ShoppingList = mongoose.model('List', {
  id: String,
  userId: String,
  name: String,
  items: [{
    name: String,
    amount: Number,
    uds: Number
  }]
});

export default ShoppingList;
