const express = require('express');
const { Pool } = require('pg'); // Importa conexão com o banco
const cors = require('cors'); // Necessário para o frontend acessar a API
const app = express();

app.use(express.json());

// Resolve o problema de CORS (Bloqueio do navegador)
app.use(cors());

// Configuração do Banco de Dados usando as variáveis de ambiente do docker-compose
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'senha_secreta',
  database: process.env.DB_NAME || 'pedidos_db',
  port: 5432,
});

// Endpoint de Healthcheck (obrigatório)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Rota GET: Retorna os pedidos do banco de dados
app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos ORDER BY criado_em DESC');
        res.status(200).json({ message: "Sucesso", data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor", data: [] });
    }
});

// Rota POST: Salva um novo pedido no banco de dados
app.post('/api/pedidos', async (req, res) => {
    const { item, quantidade } = req.body;
    try {
        await pool.query(
            'INSERT INTO pedidos (item, quantidade, status) VALUES ($1, $2, $3)',
            [item, quantidade, 'Processando']
        );
        res.status(201).json({ message: "Pedido criado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao criar pedido" });
    }
});

module.exports = app;