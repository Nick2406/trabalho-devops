const request = require('supertest');
const app = require('../src/app'); 

describe('Testes de Integração - API', () => {
  
  // Teste 1: Requisito de Healthcheck
  it('Deve responder com status 200 na rota de Healthcheck', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  // Teste 2: Requisito do Endpoint Principal (Pedidos de Hardware)
  it('Deve responder com status 200 na rota principal de pedidos', async () => {
    const response = await request(app).get('/api/pedidos');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    // Verifica se a propriedade 'data' existe e é um array (mesmo que vazio)
    expect(Array.isArray(response.body.data)).toBeTruthy(); 
  });

});