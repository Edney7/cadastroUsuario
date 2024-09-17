const { Pool } = require('pg');

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cadastro_usuarios',
    password: '1234',
    port: 5432,
});

module.exports = { pool };
