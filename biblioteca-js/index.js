const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Autor = require('./models/autor');
const Livro = require('./models/livro');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("API da Biblioteca rodando! 📚");
});

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

app.put('/autores/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, nacionalidade } = req.body;
    const autor = await Autor.findByPk(id);

    if (!autor) return res.status(404).json({ error: 'Autor não encontrado' });

    autor.nome = nome;
    autor.nacionalidade = nacionalidade;
    await autor.save();

    res.json(autor);
});

app.delete('/autores/:id', async (req, res) => {
    const { id } = req.params;
    const autor = await Autor.findByPk(id);

    if (!autor) return res.status(404).json({ error: 'Autor não encontrado' });

    await autor.destroy();
    res.json({ message: 'Autor deletado com sucesso' });
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

app.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, ano, AutorId } = req.body;

    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    livro.titulo = titulo;
    livro.ano = ano;
    livro.AutorId = AutorId;
    await livro.save();

    res.json(livro);
});

app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;

    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    await livro.destroy();
    res.json({ message: 'Livro deletado com sucesso' });

});
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
