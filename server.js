const express = require ('express');
const path = require ('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const cancionRoutes = require('./routes/cancionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/canciones', cancionRoutes);
app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});