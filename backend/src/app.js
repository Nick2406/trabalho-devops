const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'senha_secreta',
  database: process.env.DB_NAME || 'pedidos_db',
  port: 5432,
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos ORDER BY id DESC');
        res.status(200).json({ message: "Sucesso", data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor", data: [] });
    }
});

app.post('/api/pedidos', async (req, res) => {
    const { item, quantidade, tipo } = req.body;
    
    console.log("--> DADO RECEBIDO DO FRONTEND:", req.body); 

    try {
        await pool.query(
            'INSERT INTO pedidos (item, quantidade, status, tipo) VALUES ($1, $2, $3, $4)',
            [item, quantidade, 'Processando', tipo]
        );
        res.status(201).json({ message: "Pedido criado com sucesso!" });
    } catch (err) {
        console.error("Erro no banco:", err);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = app;