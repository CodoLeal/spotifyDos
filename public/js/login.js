const db = require('../config/db'); 

const procesarLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, rellena todos los campos.' });
    }

    try {
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (usuarios.length === 0) {
            return res.status(401).json({ error: 'El correo electrónico no se encuentra registrado.' });
        }

        const usuario = usuarios[0];

        if (usuario.password !== password) {
            return res.status(401).json({ error: 'La contraseña ingresada es incorrecta.' });
        }

        return res.status(200).json({ 
            mensaje: 'Inicio de sesión exitoso.',
            usuario: { id: usuario.id, nombre: usuario.nombre }
        });

    } catch (error) {
        console.error('Error en el servidor durante el login:', error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar el ingreso.' });
    }
};

module.exports = {
    procesarLogin
};