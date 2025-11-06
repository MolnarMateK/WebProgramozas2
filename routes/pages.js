const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Behozzuk az új middleware-ünket
const { isLoggedIn } = require('../middleware/authMiddleware');

// Főoldal (mindenki elérheti)
router.get('/', pageController.showIndex);

// Adatbázis (mindenki elérheti)
router.get('/adatbazis', pageController.showAdatbazis);

// Kapcsolat (GET - űrlap)
router.get('/kapcsolat', pageController.showKapcsolat);

// Kapcsolat (POST - feldolgozás)
router.post('/kapcsolat', pageController.postKapcsolat);

// Üzenetek (VÉDETT)
// Csak az 'isLoggedIn' middleware sikeres lefutása után 
// fogja meghívni a pageController.showUzenetek funkciót 
router.get('/uzenetek', isLoggedIn, pageController.showUzenetek);

module.exports = router;