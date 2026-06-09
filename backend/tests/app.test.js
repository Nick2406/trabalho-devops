const request = require('supertest');
const app = require('../src/app');

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