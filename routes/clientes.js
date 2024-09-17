const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Rota para exibir formulário de cadastro de clientes
router.get('/', (req, res) => {
    res.render('clientes');
});

// Rota para processar formulário de cadastro de clientes
router.post('/', async (req, res) => {
    const { name, address, city, cpf, rg, phone } = req.body;

    try {
        const query = 'INSERT INTO customers (name, address, city, cpf, rg, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        const values = [name, address, city, cpf, rg, phone];
        const result = await pool.query(query, values);
        res.send(`Cliente cadastrado. ID: ${result.rows[0].id}`);
    } catch (err) {
        console.error('Não foi possível cadastrar cliente!', err);
        res.status(500).send('Erro ao cadastrar cliente');
    }
});

module.exports = router;
