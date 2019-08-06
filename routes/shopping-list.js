const express = require('express');

const router = express.Router();
const shoppingListController = require('../controllers/shopping-list');

router.put('/create', shoppingListController.createShoppingList);
router.post('/single/:name', shoppingListController.setProducts);
router.get('/single/:name', shoppingListController.getShoppingList);
router.get('/all', shoppingListController.getAllShoppingLists);

module.exports = router;
