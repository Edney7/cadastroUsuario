const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

// Rota para exibir formulário de cadastro de usuários
router.get('/', (req, res) => {
    res.render('cadastro');
});

// Rota para processar formulário de cadastro de usuários
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
        const values = [name, email, hashedPassword];
        const result = await pool.query(query, values);
        res.send(`Usuário cadastrado. ID: ${result.rows[0].id}`);
    } catch (err) {
        console.error('Não foi possível cadastrar usuário!', err);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

module.exports = router;
