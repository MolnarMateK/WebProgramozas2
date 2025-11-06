const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = 4026;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'webprog2-beadando-titkos-kulcs-Dalgrya-MolnarMateK',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    next();
});


// ÚTVONALAK BEÖLTÉSE
const pageRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');
const adminRoutes = require('./routes/admin'); // <-- EZ AZ ÚJ SOR

app.use('/', pageRoutes);
app.use('/', authRoutes);
app.use('/', crudRoutes);
app.use('/', adminRoutes); // <-- EZ AZ ÚJ SOR


app.listen(PORT, () => {
    console.log(`Szerver elindítva a http://localhost:${PORT} címen.`);
    console.log(`A tanári Excel alapján (HV1WUV) a szerveren ezen a porton kell futnia: ${PORT}`);
    console.log(`És ezen az útvonalon lesz elérhető: http://143.47.98.96/app026`);
});