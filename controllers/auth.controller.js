const db = require('../config/db');

const procesarLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Por favor, ingresa el usuario y la contraseña.' });
    return;
  }

  db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, filas) => {
    if (err) {
      console.error("Error en la BD:", err);
      res.status(500).json({ error: 'Error interno del servidor al verificar los datos.' });
      return;
    }

    if (filas.length === 0) {
      res.status(401).json({ error: 'El usuario no existe.' });
      return;
    }

    const usuario = filas[0];

    if (usuario.password !== password) {
      res.status(401).json({ error: 'La contraseña es incorrecta.' });
      return;
    }

    res.status(200).json({ mensaje: 'Ingreso exitoso' });
  });
};

module.exports = { procesarLogin };