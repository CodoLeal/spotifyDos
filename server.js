const express = require ('express');
const path = require ('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const cancionRoutes = require('./routes/canciones');
const usuarioRoutes = require('./routes/usuarios');

app.use('/canciones', cancionRoutes);
app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});