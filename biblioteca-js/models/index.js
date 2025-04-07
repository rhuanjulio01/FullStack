const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../database');
const Autor = require('./autor');
const Livro = require('./livro');

const app = express();
app.use(bodyParser.json());

// Sincronizar banco
sequelize.sync().then(() => {
    console.log("Banco sincronizado.");
});

// ROTAS AUTOR
app.post('/autores', async (req, res) => {
    const autor = await Autor.create(req.body);
    res.json(autor);
});

app.get('/autores', async (req, res) => {
    const autores = await Autor.findAll();
    res.json(autores);
});

// ROTAS LIVRO
app.post('/livros', async (req, res) => {
    const livro = await Livro.create(req.body);
    res.json(livro);
});

app.get('/livros', async (req, res) => {
    const livros = await Livro.findAll({ include: Autor });
    res.json(livros);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
