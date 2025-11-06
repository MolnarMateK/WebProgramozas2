const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Behozzuk az 'isAdmin' ellenőrzőt a meglévő middleware fájlunkból
const { isAdmin } = require('../middleware/authMiddleware');

// Az /admin útvonalat levédjük az 'isAdmin' middleware-rel
// Csak az láthatja, akinek a session-jében role='admin' van
router.get('/admin', isAdmin, adminController.showAdminPage);

module.exports = router;

