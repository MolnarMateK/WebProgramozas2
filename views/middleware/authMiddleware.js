// Ez a funkció ellenőrzi, hogy a felhasználó be van-e jelentkezve
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        // Ha igen (van 'user' a session-ben), mehet tovább a kérés
        return next();
    }
    // Ha nem, átirányítjuk a login oldalra
    res.redirect('/login');
};

// Ezt később fogjuk használni az Admin oldalhoz
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Ha nem admin, dobjuk a főoldalra
    res.redirect('/');
};
