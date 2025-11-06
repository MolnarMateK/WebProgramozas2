exports.showIndex = (req, res) => {
    res.render('index', { 
        title: 'Főoldal' 
    });
};

exports.showAdatbazis = (req, res) => {
    res.send('Adatbázis Menü - Folyamatban...');
};

exports.showKapcsolat = (req, res) => {
    res.send('Kapcsolat Menü - Folyamatban...');
};
