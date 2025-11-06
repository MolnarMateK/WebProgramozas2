// Admin oldal megjelenítése
exports.showAdminPage = (req, res) => {
    res.render('admin', { title: 'Admin Felület' });
};