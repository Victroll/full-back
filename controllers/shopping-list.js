const ShoppingList = require('../models/shopping-list');
const Product = require('../models/product');

exports.createShoppingList = (req, res) => {
  // Check all the data is in place
  if (req.body.name) {
    let newProducts = [];
    if (req.body.products && req.body.products.length) {
      newProducts = req.body.products.map(
        ({ name, amount }) =>
          new Product({
            name,
            amount
          })
      );
    }
    const newList = new ShoppingList({
      name: req.body.name,
      products: newProducts
    });
    newList.save((err, list) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(list._id);
    });
  } else {
    return res.status(400).send('Name was empty');
  }
};

exports.addProducts = (req, res) => {
  // Check all the data is in place
  if (req.params.name && req.body.products && req.body.products.length) {
    ShoppingList.findOne({ name: req.params.name }, (err1, sl) => {
      if (err1) {
        return res.status(500).send(err1);
      }
      if (!sl) {
        return res
          .status(404)
          .send(`Shopping list ${req.params.name} does not exist`);
      }
      sl.update(
        {
          products: JSON.parse(req.body.products).map(
            ({ name, amount }) =>
              new Product({
                name,
                amount
              })
          )
        },
        err2 => {
          if (err2) {
            return res.status(500).send(err2);
          }
          return res.send('List updated correctly');
        }
      );
    });
  }
};
