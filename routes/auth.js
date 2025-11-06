const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Regisztráció
router.get('/register', authController.showRegister);
router.post('/register', authController.postRegister);

// Bejelentkezés
router.get('/login', authController.showLogin);
router.post('/login', authController.postLogin);

// Kijelentkezés
router.get('/logout', authController.logout);

module.exports = router;