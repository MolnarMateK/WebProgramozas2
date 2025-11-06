const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');
const { isLoggedIn } = require('../middleware/authMiddleware');

// A teljes CRUD szekciót levédjük
// Csak bejelentkezett felhasználó érheti el
router.use('/crud', isLoggedIn);

// READ
router.get('/crud', crudController.showCrudList);

// CREATE
router.get('/crud/add', crudController.showAddForm);
router.post('/crud/add', crudController.postAddForm);

// UPDATE
router.get('/crud/edit/:id', crudController.showEditForm);
router.post('/crud/edit/:id', crudController.postEditForm);

// DELETE
router.get('/crud/delete/:id', crudController.deleteSpectator);

module.exports = router;