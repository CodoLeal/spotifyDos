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

const editarUsuario = (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'El nombre de usuario es obligatorio.' });
    }

    if (password) {
        db.query(
            'UPDATE usuarios SET username = ?, password = ? WHERE id = ?',
            [username, password, id],
            (err, resultado) => {
                if (err) {
                    console.error('Error al editar usuario con contraseña:', err);
                    return res.status(500).json({ error: 'Error al editar el usuario.' });
                }
                return res.status(200).json({ mensaje: 'Usuario actualizado con éxito.' });
            }
        );
    } else {
        db.query(
            'UPDATE usuarios SET username = ? WHERE id = ?',
            [username, id],
            (err, resultado) => {
                if (err) {
                    console.error('Error al editar usuario sin contraseña:', err);
                    return res.status(500).json({ error: 'Error al editar el usuario.' });
                }
                return res.status(200).json({ mensaje: 'Usuario actualizado con éxito.' });
            }
        );
    }
};

const eliminarUsuario = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario.' });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        return res.status(200).json({ mensaje: 'Usuario eliminado con éxito.' });
    });
};

module.exports = {
    listarUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
};