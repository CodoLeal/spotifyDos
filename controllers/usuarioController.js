const db = require('../config/db');

const listarUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username FROM usuarios');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};

const crearUsuario = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El usuario y la contraseña son obligatorios.' });
    }

    try {
        await db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password]);
        return res.status(201).json({ mensaje: 'Administrador creado con éxito.' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ error: 'Error al registrar el administrador.' });
    }
};

module.exports = {
    listarUsuarios,
    crearUsuario
};