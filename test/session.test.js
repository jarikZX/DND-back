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

describe('Session API', () => {
  let token;

  beforeAll(async () => {
    try {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123'
        });

      token = res.body.token;
    } catch (err) {
      console.error('Error in beforeAll hook:', err);
    }
  });

  it('should create a session', async () => {
    try {
      const res = await request(app)
        .post('/api/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Session',
          description: 'A test session',
          password: 'sessionpassword'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Session');
    } catch (err) {
      console.error('Error in create session test:', err);
    }
  });

  it('should get sessions', async () => {
    try {
      const res = await request(app)
        .get('/api/sessions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    } catch (err) {
      console.error('Error in get sessions test:', err);
    }
  });
});
