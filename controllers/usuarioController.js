const db = require('../config/db'); 


const listarUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nombre, email FROM usuarios');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        await db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password]);
        return res.status(201).json({ mensaje: 'Usuario creado con éxito.' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        await db.query('UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?', [nombre, email, password, id]);
        return res.status(200).json({ mensaje: 'Usuario actualizado con éxito.' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ error: 'Error al modificar el usuario.' });
    }
};

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ error: 'Error al borrar el usuario.' });
    }
};

module.exports = {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};