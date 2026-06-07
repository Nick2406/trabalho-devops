CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pedidos (item, quantidade, status) 
VALUES ('Pedido Inicial de Teste', 1, 'Processando');