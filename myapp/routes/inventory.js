const express = require('express');
const router = express.Router();
const inventoryCtrl = require('../controller/inventoryCtrl');

router.get('/', inventoryCtrl.getAllBooks);
router.get('/:id', inventoryCtrl.getBookById);
router.post('/', inventoryCtrl.createBook);
router.put('/:id', inventoryCtrl.updateBook);
router.delete('/:id', inventoryCtrl.deleteBook);

module.exports = router;
