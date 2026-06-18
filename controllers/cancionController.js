const db = require('../config/db');
const Cancion = require('../models/CancionModel');

const listar = (req, res) => {
  db.query('SELECT * FROM canciones', (err, filas) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las canciones' });
      return;
    }
    const canciones = filas.map(
      (fila) => new Cancion(fila.id, fila.titulo, fila.artista, fila.album, fila.duracion, fila.genero)
    );
    res.json(canciones);
  });
};

const agregar = (req, res) => {
    const { titulo, artista, album, duracion, genero } = req.body;

    if (!titulo || !artista || !album || !duracion || !genero) {
        res.status(400).json({ error: 'Faltan campos obligatorios' });
        return;
    }

    db.query(
        'INSERT INTO canciones (titulo, artista, album, duracion, genero) VALUES (?, ?, ?, ?, ?)',
        [titulo, artista, album, duracion, genero],
        (err, resultado) => {
            if (err) {
                res.status(500).json({ error: 'Error al agregar la canción' });
                return;
            }
            const nuevaCancion = new Cancion(resultado.insertId, titulo, artista, album, duracion, genero);
            res.status(201).json(nuevaCancion);
        }
    );
};

const editar = (req, res) => {
    const { id } = req.params;
    const { titulo, artista, album, duracion, genero } = req.body;

    if (!titulo || !artista || !album || !duracion || !genero) {
        res.status(400).json({ error: 'Faltan campos obligatorios' });
        return;
    }

    db.query(
        'UPDATE canciones SET titulo = ?, artista = ?, album = ?, duracion = ?, genero = ? WHERE id = ?',
        [titulo, artista, album, duracion, genero, id],
        (err, resultado) => {
            if(err){
                res.status(500).json({ error: 'Error al editar la canción' });
                return;
            }
            res.json(new Cancion(id, titulo, artista, album, duracion, genero));
        }
    );
};    

const eliminar = (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM canciones WHERE id = ?', [id], (err, resultado) => {
        if(err){
            res.status(500).json({ error: 'Error al eliminar la canción' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Canción no encontrada' });
            return;
        }
        res.json({ message: 'Canción eliminada correctamente' });
    });
};

module.exports = {
    listar,
    agregar,
    editar,
    eliminar
};