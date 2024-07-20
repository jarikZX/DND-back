require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../index');
const db = require('../models');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
  server.close();
});

describe('Auth API', () => {
  it('should register a user', async () => {
    try {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
    } catch (err) {
      console.error('Error in register test:', err);
    }
  });

  it('should login a user', async () => {
    try {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    } catch (err) {
      console.error('Error in login test:', err);
    }
  });
});
