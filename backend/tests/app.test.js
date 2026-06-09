const request = require('supertest');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }), // Simula que qualquer query retorna sucesso
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = require('../src/app'); // Importa o app DEPOIS do mock

describe('Testes da API de Pedidos', () => {
  
  it('Deve criar um novo pedido com o tipo correto', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({
        item: 'Álbum de Teste Jest',
        quantidade: 1,
        tipo: 'CD'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Pedido criado com sucesso!');
  });

  it('Deve listar os pedidos existentes', async () => {
    const res = await request(app).get('/api/pedidos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});