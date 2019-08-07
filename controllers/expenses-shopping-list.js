const ExpensesShoppingList = require('../models/expenses-shopping-list');
const { verifyUser } = require('../controllers/user');

exports.addExpense = (req, res) => {
  // Check all the data is in place
  if (req.body.owner && req.body.amount && req.body.date) {
    verifyUser(req.headers.authorization, (err1, user) => {
      if (err1) {
        return res.status(500).send(err1);
      }
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      // If the expense for this user and date exists, update it
      ExpensesShoppingList.findOne(
        {
          owner: req.body.owner,
          date: req.body.date
        },
        (err2, exp1) => {
          if (err2) {
            return res.status(500).send(err2);
          }
          if (!exp1) {
            const newExpense = new ExpensesShoppingList({
              owner: req.body.owner,
              amount: req.body.amount,
              date: req.body.date
            });
            newExpense.save((err3, exp2) => {
              if (err2 || !exp2) {
                return res.status(500).send(err3);
              }
              return res.send('Expense added');
            });
          }
          exp1.update(
            {
              amount: req.body.amount
            },
            err4 => {
              if (err4) {
                return res.status(500).send(err4);
              }
              res.send('Expense updated');
            }
          );
        }
      );
    });
  } else {
    return res.status(400).send('One or more params were empty');
  }
};

exports.getAllExpenses = (req, res) => {
  // Check all the data is in place
  if (req.query.owner) {
    verifyUser(req.headers.authorization, (err1, user) => {
      if (err1) {
        return res.status(500).send(err1);
      }
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      ExpensesShoppingList.find(
        {
          owner: req.query.owner
        },
        (err2, exps) => {
          if (err2) {
            return res.status(500).send(err);
          }
          if (!exps.length) {
            return res.send([]);
          }
          return res.send(exps.map(({ date, amount }) => ({ date, amount })));
        }
      );
    });
  } else {
    return res.status(400).send('The owner was empty');
  }
};
