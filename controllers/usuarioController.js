const db = require('../config/db');

const listarUsuarios = (req, res) => {
    db.query('SELECT id, username FROM usuarios', (err, filas) => {
        if (err) {
            console.error('Error al listar usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios.' });
        }
        return res.status(200).json(filas);
    });
};

const crearUsuario = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El usuario y la contraseña son obligatorios.' });
    }

    db.query(
        'INSERT INTO usuarios (username, password) VALUES (?, ?)',
        [username, password],
        (err, resultado) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                return res.status(500).json({ error: 'Error al registrar el administrador.' });
            }
            return res.status(201).json({ mensaje: 'Administrador creado con éxito.' });
        }
    );
};

module.exports = {
    listarUsuarios,
    crearUsuario
};