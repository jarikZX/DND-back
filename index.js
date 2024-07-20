const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();
const sessionController = require('./controllers/sessionController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/characters', require('./routes/characterRoutes'));
app.use('/api/maps', require('./routes/mapRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/spells', require('./routes/spellRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/weapons', require('./routes/weaponRoutes'));
app.use('/api/armors', require('./routes/armorRoutes'));
app.use('/api/consumables', require('./routes/consumableRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/monsters', require('./routes/mosnterRoutes.js'));

app.use((err, req, res, next) => {
  console.error('Internal server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const sessionUsers = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinSession', (sessionId) => {
    socket.join(sessionId);
    if (!sessionUsers[sessionId]) {
      sessionUsers[sessionId] = new Set();
    }
    sessionUsers[sessionId].add(socket.id);
    console.log(`User joined session: ${sessionId}`);
  });

  socket.on('leaveSession', (sessionId) => {
    if (sessionUsers[sessionId]) {
      sessionUsers[sessionId].delete(socket.id);
      if (sessionUsers[sessionId].size === 0) {
        delete sessionUsers[sessionId];
       
        sessionController.deleteSession(sessionId);
      }
    }
    socket.leave(sessionId);
    console.log(`User left session: ${sessionId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    for (let sessionId in sessionUsers) {
      if (sessionUsers[sessionId].has(socket.id)) {
        sessionUsers[sessionId].delete(socket.id);
        if (sessionUsers[sessionId].size === 0) {
          delete sessionUsers[sessionId];
          sessionController.deleteSession(sessionId);
        }
        break;
      }
    }
  });
});

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
}

module.exports = { app, server, io };
