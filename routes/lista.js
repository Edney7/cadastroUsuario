// routes/lista.js
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Rota para exibir a lista de clientes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customers');
        res.render('lista', { clientes: result.rows });
    } catch (err) {
        console.error('Erro ao obter lista de clientes:', err);
        res.status(500).send('Erro ao obter lista de clientes');
    }
});

module.exports = router;
