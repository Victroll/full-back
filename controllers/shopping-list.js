const ShoppingList = require('../models/shopping-list');
const { Product } = require('../models/product');
const { verifyUser } = require('../controllers/user');

exports.createShoppingList = (req, res) => {
  // Check all the data is in place
  if (req.body.name && req.body.owner) {
    if (req.headers.authorization) {
      verifyUser(req.headers.authorization, (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user) {
          return res.status(403).send('Unauthorized access');
        }
        let newProducts = [];
        if (req.body.products && req.body.products.length) {
          newProducts = JSON.parse(req.body.products).map(
            ({ name, amount }) =>
              new Product({
                name,
                amount
              })
          );
        }
        const newList = new ShoppingList({
          name: req.body.name,
          owner: req.body.owner,
          products: newProducts
        });
        newList.save((err2, list) => {
          if (err2) {
            return res.status(500).send(err);
          }
          return res.send(list._id);
        });
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('Name was empty');
  }
};

exports.getAllShoppingLists = (req, res) => {
  // Check all the data is in place
  if (req.query.owner) {
    if (req.headers.authorization) {
      verifyUser(req.headers.authorization, (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user) {
          return res.status(403).send('Unauthorized access');
        }
        ShoppingList.find({ owner: req.query.owner }, (err2, lists) => {
          if (err2) {
            return res.status(500).send(err2);
          }
          if (!lists.length) {
            return res.send({});
          }
          const ret = {};
          lists.forEach(({ name: listName, products }) => {
            ret[listName] = products.map(({ name, amount }) => ({
              name,
              amount
            }));
          });
          return res.send(ret);
        });
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('Owner was empty');
  }
};

exports.getShoppingList = (req, res) => {
  // Check all the data is in place
  if (req.params.name && req.params.owner) {
    if (req.headers.authorization) {
      verifyUser(req.headers.authorization, (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user) {
          return res.status(403).send('Unauthorized access');
        }
        ShoppingList.findOne(
          {
            name: req.params.name,
            owner: req.params.owner
          },
          (err2, sl) => {
            if (err2) {
              return res.status(500).send(err2);
            }
            if (!sl) {
              return res
                .status(404)
                .send(`Shopping list ${req.params.name} does not exist`);
            }
            return res.send(
              sl.products.map(({ name, amount }) => ({
                name,
                amount
              }))
            );
          }
        );
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('Name or owner was empty');
  }
};

exports.deleteList = (req, res) => {
  if (req.params.name && req.query.owner) {
    if (req.headers.authorization) {
      verifyUser(req.headers.authorization, (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user) {
          return res.status(403).send('Unauthorized access');
        }
        ShoppingList.deleteOne(
          {
            name: req.params.name,
            owner: req.query.owner
          },
          err => {
            if (err) {
              return res.status(500).send(err);
            }
            ShoppingList.find({ owner: req.query.owner }, (err2, lists) => {
              if (err2) {
                return res.status(500).send(err2);
              }
              if (!lists.length) {
                return res.send({});
              }
              const ret = {};
              lists.forEach(({ name: listName, products }) => {
                ret[listName] = products.map(({ name, amount }) => ({
                  name,
                  amount
                }));
              });
              return res.send(ret);
            });
          }
        );
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('One or more params are empty');
  }
};

exports.setProducts = (req, res) => {
  // Check all the data is in place
  if (
    req.params.name &&
    req.body.owner &&
    req.body.newName &&
    req.body.products &&
    req.body.products.length
  ) {
    if (req.headers.authorization) {
      verifyUser(req.headers.authorization, (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user) {
          return res.status(403).send('Unauthorized access');
        }
        ShoppingList.findOne(
          {
            name: req.params.name,
            owner: req.body.owner
          },
          (err2, sl) => {
            if (err2) {
              return res.status(500).send(err2);
            }
            if (!sl) {
              return res
                .status(404)
                .send(`Shopping list ${req.params.name} does not exist`);
            }
            sl.update(
              {
                name: req.body.newName,
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
          }
        );
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('One or more params are empty');
  }
};
