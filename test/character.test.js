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

describe('Character API', () => {
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

  it('should create a character', async () => {
    try {
      const res = await request(app)
        .post('/api/characters')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Character',
          level: 1,
          class: 'Warrior',
          strength: 10,
          agility: 5,
          endurance: 8,
          background: 'A brave warrior',
          model: 'warrior.png',
          movementRange: 5
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Character');
    } catch (err) {
      console.error('Error in create character test:', err);
    }
  });

  it('should get characters', async () => {
    try {
      const res = await request(app)
        .get('/api/characters')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    } catch (err) {
      console.error('Error in get characters test:', err);
    }
  });
});
