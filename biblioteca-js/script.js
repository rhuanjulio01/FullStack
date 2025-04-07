const API = 'http://localhost:3000';

// CADASTRAR AUTOR
document.getElementById('autorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const nacionalidade = document.getElementById('nacionalidade').value;

    await fetch(`${API}/autores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nacionalidade })
    });

    alert('Autor cadastrado!');
    carregarAutores();
    preencherSelectAutores(); // <- ADICIONE AQUI
document.getElementById('autorForm').reset(); // <- também pode adicionar para limpar o formulário
});

// CADASTRAR LIVRO
document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const ano = document.getElementById('ano').value;
    const AutorId = document.getElementById('autorId').value;

    await fetch(`${API}/livros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, ano, AutorId })
    });

    alert('Livro cadastrado!');
    carregarLivros();
    document.getElementById('livroForm').reset();
});

// LISTAR LIVROS
async function carregarLivros() {
    const resposta = await fetch(`${API}/livros`);
    const livros = await resposta.json();

    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '';

    livros.forEach(livro => {
        const item = document.createElement('li');

        const info = document.createElement('div');
        info.className = 'livro-info';
        info.textContent = `"${livro.titulo}" (${livro.ano}) - Autor: ${livro.Autor?.nome}`;

        const botoes = document.createElement('div');
        botoes.className = 'botoes';

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarLivro(livro);

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.onclick = () => deletarLivro(livro.id);

        botoes.appendChild(btnEditar);
        botoes.appendChild(btnDeletar);

        item.appendChild(info);
        item.appendChild(botoes);
        lista.appendChild(item);
    });
}

// DELETAR LIVRO
async function deletarLivro(id) {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
        await fetch(`${API}/livros/${id}`, { method: 'DELETE' });
        carregarLivros();
    }
}

// EDITAR LIVRO COM MODAL
function editarLivro(livro) {
  document.getElementById('editLivroId').value = livro.id;
  document.getElementById('editTitulo').value = livro.titulo;
  document.getElementById('editAno').value = livro.ano;

  // Carregar autores no select do modal
  fetch(`${API}/autores`)
      .then(res => res.json())
      .then(autores => {
          const select = document.getElementById('editAutorId');
          select.innerHTML = ''; // limpa
          autores.forEach(autor => {
              const option = document.createElement('option');
              option.value = autor.id;
              option.textContent = autor.nome;
              if (autor.id === livro.AutorId) {
                  option.selected = true;
              }
              select.appendChild(option);
          });

          // Mostrar modal
          document.getElementById('modalLivro').classList.remove('hidden');
      });
}

function fecharModalLivro() {
  document.getElementById('modalLivro').classList.add('hidden');
}

document.getElementById('formEditarLivro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editLivroId').value;
  const titulo = document.getElementById('editTitulo').value;
  const ano = document.getElementById('editAno').value;
  const AutorId = document.getElementById('editAutorId').value;

  await fetch(`${API}/livros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, ano: Number(ano), AutorId: Number(AutorId) })
  });

  fecharModalLivro();
  carregarLivros();
});


// LISTAR AUTORES
async function carregarAutores() {
    const resposta = await fetch(`${API}/autores`);
    const autores = await resposta.json();

    const lista = document.getElementById('listaAutores');
    lista.innerHTML = '';

    autores.forEach(autor => {
        const item = document.createElement('li');
        item.dataset.id = autor.id;

        const info = document.createElement('div');
        info.className = 'autor-info';
        info.textContent = `${autor.nome} - ${autor.nacionalidade} (ID: ${autor.id})`;

        const botoes = document.createElement('div');
        botoes.className = 'botoes';

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarAutor(autor);

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.onclick = () => deletarAutor(autor.id);

        botoes.appendChild(btnEditar);
        botoes.appendChild(btnDeletar);

        item.appendChild(info);
        item.appendChild(botoes);
        lista.appendChild(item);
    });
}
async function preencherSelectAutores() {
  const resposta = await fetch(`${API}/autores`);
  const autores = await resposta.json();

  const selectPrincipal = document.getElementById('autorId');
  selectPrincipal.innerHTML = ''; // limpa opções antigas

  autores.forEach(autor => {
      const option = document.createElement('option');
      option.value = autor.id;
      option.textContent = autor.nome;
      selectPrincipal.appendChild(option);
  });
}



// DELETAR AUTOR
async function deletarAutor(id) {
    if (confirm('Tem certeza que deseja deletar este autor?')) {
        await fetch(`${API}/autores/${id}`, { method: 'DELETE' });
        carregarAutores();
    }
}

// EDITAR AUTOR
function editarAutor(autor) {
    document.getElementById('editAutorId').value = autor.id;
    document.getElementById('editNome').value = autor.nome;
    document.getElementById('editNacionalidade').value = autor.nacionalidade;
    document.getElementById('modalAutor').classList.remove('hidden');
}

function fecharModalAutor() {
    document.getElementById('modalAutor').classList.add('hidden');
}

document.getElementById('formEditarAutor').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editAutorId').value;
    const nome = document.getElementById('editNome').value;
    const nacionalidade = document.getElementById('editNacionalidade').value;

    await fetch(`${API}/autores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nacionalidade })
    });

    fecharModalAutor();
    carregarAutores();  
});

// CARREGAR DADOS INICIAIS
carregarLivros();
carregarAutores();
preencherSelectAutores();
