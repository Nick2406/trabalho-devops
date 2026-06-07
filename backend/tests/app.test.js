const request = require('supertest');
const app = require('../src/app');
describe('Testes de Integração - API', () => {
  
  it('Deve responder com status 200 na rota de Healthcheck', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

});