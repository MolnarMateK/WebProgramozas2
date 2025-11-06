const db = require('../config/db'); // Adatbázis pool

// Főoldal megjelenítése
exports.showIndex = (req, res) => {
    res.render('index', { 
        title: 'Főoldal' 
    });
};

// --- ADATBÁZIS MENÜ (3 TÁBLÁS JOIN) ---
exports.showAdatbazis = async (req, res) => {
    try {
        const query = `
            SELECT 
                nezo.nev AS nezoNeve,
                meccs.tipus AS meccsTipusa,
                meccs.datum AS meccsDatuma,
                belepes.idopont AS belepesIdopontja
            FROM 
                belepes
            JOIN 
                nezo ON belepes.nezoid = nezo.id
            JOIN 
                meccs ON belepes.meccsid = meccs.id
            ORDER BY 
                meccs.datum DESC, belepes.idopont DESC;
        `;
        
        const [results] = await db.execute(query);

        res.render('adatbazis', {
            title: 'Adatbázis',
            results: results
        });

    } catch (err) {
        console.error('3 Táblás lekérdezés hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

// --- KAPCSOLAT ÉS ÜZENETEK ---

// Kapcsolat űrlap megjelenítése (GET)
exports.showKapcsolat = (req, res) => {
    res.render('kapcsolat', { title: 'Kapcsolat' });
};

// Kapcsolat űrlap feldolgozása (POST)
exports.postKapcsolat = async (req, res) => {
    try {
        const { nev, email, uzenet } = req.body;
        
        await db.execute(
            'INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)',
            [nev, email, uzenet]
        );
        
        res.redirect('/kapcsolat');

    } catch (err) {
        console.error('Kapcsolat űrlap hiba:', err);
        res.redirect('/kapcsolat');
    }
};

// Üzenetek oldal megjelenítése (GET)
exports.showUzenetek = async (req, res) => {
    try {
        const [messages] = await db.execute(
            'SELECT * FROM uzenetek ORDER BY sent_at DESC'
        );

        res.render('uzenetek', { 
            title: 'Üzenetek',
            messages: messages
        });

    } catch (err) {
        console.error('Üzenetek lekérdezési hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};



