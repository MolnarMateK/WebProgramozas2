const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.showIndex);
router.get('/adatbazis', pageController.showAdatbazis);
router.get('/kapcsolat', pageController.showKapcsolat);

module.exports = router;
