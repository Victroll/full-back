const express = require('express');

const router = express.Router();
const expensesShoppingListController = require('../controllers/expenses-shopping-list');

router.get('/all', expensesShoppingListController.getAllExpenses);
router.post('/add', expensesShoppingListController.addExpense);

module.exports = router;
