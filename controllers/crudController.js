const db = require('../config/db');

// Összes néző listázása (READ)
exports.showCrudList = async (req, res) => {
    try {
        const [spectators] = await db.execute('SELECT * FROM nezo ORDER BY nev');
        res.render('crud', {
            title: 'CRUD Kezelés',
            spectators: spectators
        });
    } catch (err) {
        console.error('CRUD Lista hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

// --- CREATE ---

// Új néző űrlap megjelenítése
exports.showAddForm = (req, res) => {
    res.render('crud_add', { title: 'Új Néző' });
};

// Új néző feldolgozása
exports.postAddForm = async (req, res) => {
    try {
        const { nev, ferfi, berletes } = req.body;
        await db.execute(
            'INSERT INTO nezo (nev, ferfi, berletes) VALUES (?, ?, ?)',
            [nev, ferfi, berletes]
        );
        res.redirect('/crud');
    } catch (err) {
        console.error('CRUD Hozzáadás hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

// --- UPDATE ---

// Módosító űrlap megjelenítése
exports.showEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM nezo WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.redirect('/crud'); // Ha nincs ilyen ID
        }

        res.render('crud_edit', {
            title: 'Néző Módosítása',
            nezo: rows[0]
        });
    } catch (err) {
        console.error('CRUD Edit (Show) hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

// Módosítás feldolgozása
exports.postEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { nev, ferfi, berletes } = req.body;
        
        await db.execute(
            'UPDATE nezo SET nev = ?, ferfi = ?, berletes = ? WHERE id = ?',
            [nev, ferfi, berletes, id]
        );
        
        res.redirect('/crud');
    } catch (err) {
        console.error('CRUD Edit (Post) hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

// --- DELETE ---

// Néző törlése
exports.deleteSpectator = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM nezo WHERE id = ?', [id]);
        res.redirect('/crud');
    } catch (err) {
        console.error('CRUD Delete hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};