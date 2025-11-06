const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.showRegister = (req, res) => {
    res.render('register', { title: 'Regisztráció' });
};

exports.postRegister = async (req, res) => {
    try {
        const { nev, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            'INSERT INTO users (nev, email, password, role) VALUES (?, ?, ?, ?)',
            [nev, email, hashedPassword, 'regisztralt']
        );

        res.redirect('/login');

    } catch (err) {
        console.error('Regisztrációs hiba:', err);
        res.redirect('/register');
    }
};

exports.showLogin = (req, res) => {
    res.render('login', { title: 'Bejelentkezés' });
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.render('login', { title: 'Bejelentkezés', error: 'Hibás e-mail vagy jelszó.' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.user = {
                id: user.id,
                nev: user.nev,
                email: user.email,
                role: user.role
            };

            res.redirect('/');
        } else {
            return res.render('login', { title: 'Bejelentkezés', error: 'Hibás e-mail vagy jelszó.' });
        }

    } catch (err) {
        console.error('Bejelentkezési hiba:', err);
        res.status(500).send('Szerver hiba');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};