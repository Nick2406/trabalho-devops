const request = require('supertest');
const app = require('../src/app'); 

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ 
      rows: [{ id: 1, item: 'Álbum Mock', quantidade: 1, status: 'Processando', tipo: 'Vinil' }] 
    }),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Testes de Integração - API', () => {

  it('Deve responder com status 200 na rota de Healthcheck', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('Deve responder com status 200 na rota principal de pedidos', async () => {
    const response = await request(app).get('/api/pedidos');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.data)).toBeTruthy(); 
  });

});