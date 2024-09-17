// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { pool } = require('./config/database');

const app = express();

// Importando rotas
const clientesRoutes = require('./routes/clientes');
const cadastroRoutes = require('./routes/cadastro');
const listaRoutes = require('./routes/lista');
const loginRoutes = require('./routes/login');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando rotas
app.use('/clientes', clientesRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/lista', listaRoutes);
app.use('/login', loginRoutes);

// Teste de conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao banco de dados:', res.rows[0]);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
