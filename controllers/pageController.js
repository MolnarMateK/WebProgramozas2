const db = require('../config/db'); // Adatbázis pool

// Főoldal megjelenítése
exports.showIndex = (req, res) => {
    res.render('index', { 
        title: 'Főoldal' 
    });
};

// Adatbázis menü (egyelőre dummy)
exports.showAdatbazis = (req, res) => {
    // Később ide jön a 3 táblás lekérdezés
    res.send('Adatbázis Menü - Folyamatban...');
};

// --- ÚJ FUNKCIÓK INNENTŐL ---

// Kapcsolat űrlap megjelenítése (GET)
exports.showKapcsolat = (req, res) => {
    res.render('kapcsolat', { title: 'Kapcsolat' });
};

// Kapcsolat űrlap feldolgozása (POST)
exports.postKapcsolat = async (req, res) => {
    try {
        const { nev, email, uzenet } = req.body;
        
        // Adatok mentése az 'uzenetek' táblába
        await db.execute(
            'INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)',
            [nev, email, uzenet]
        );

        // Sikeres mentés után visszairányítjuk a kapcsolat oldalra
        // Később itt egy "success=true" üzenetet is küldhetünk
        res.redirect('/kapcsolat');

    } catch (err) {
        console.error('Kapcsolat űrlap hiba:', err);
        res.redirect('/kapcsolat'); // Hiba esetén is vissza
    }
};

// Üzenetek oldal megjelenítése (GET)
exports.showUzenetek = async (req, res) => {
    try {
        // Lekérdezzük az összes üzenetet, a legfrissebb elől 
        const [messages] = await db.execute(
            'SELECT * FROM uzenetek ORDER BY sent_at DESC'
        );

        res.render('uzenetek', { 
            title: 'Üzenetek',
            messages: messages // Átadjuk az üzeneteket az EJS-nek
        });

    } catch (err) {
        console.error('Üzenetek lekérdezési hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};