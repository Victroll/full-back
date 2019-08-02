const express = require('express');

const router = express.Router();
const shoppingListController = require('../controllers/shopping-list');

router.put('/create', shoppingListController.createShoppingList);
router.post('/:name', shoppingListController.addProducts);
router.get('/:name', shoppingListController.getShoppingList);

module.exports = router;
