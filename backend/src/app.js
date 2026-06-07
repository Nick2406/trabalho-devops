const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/pedidos', (req, res) => {
    res.status(200).json({ 
        message: "API do Sistema de Pedidos funcionando com sucesso!",
        data: [] 
    });
});

module.exports = app;