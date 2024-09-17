// routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const router = express.Router();

// Rota para exibir formulário de login
router.get('/', (req, res) => {
    res.render('login');
});

// Rota para processar o formulário de login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.send('Login Bem-Sucedido!');
            } else {
                res.status(400).send('Senha incorreta.');
            }
        } else {
            res.status(400).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro no login: ', error);
        res.status(500).send('Erro ao processar o login.');
    }
});

module.exports = router;
