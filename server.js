const express = require ('express');
const path = require ('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const consultasRouter = require('./routes/consultas');
app.use('/consultas', consultasRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});