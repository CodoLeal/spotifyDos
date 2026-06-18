const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotify2_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        return;
    }
    else {
        console.log('Conectado a Spotify 2');
    };
});

module.exports = db;