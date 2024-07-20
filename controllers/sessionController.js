const { Session, User, Map, Character } = require('../models');
const bcrypt = require('bcryptjs');

exports.createSession = async (req, res) => {
  try {
    const { name, password, description, mapId, characterId } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const session = await Session.create({
      name,
      password: hashedPassword,
      description,
      userId: req.user.id,
      mapId,
      characterId
    });
    await session.addParticipant(req.user.id);
    res.status(201).json({ id: session.id, name: session.name });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};


exports.joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.password && !(await bcrypt.compare(password, session.password))) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    await session.addParticipant(req.user.id);
    res.status(200).json({ message: 'Joined session successfully' });
  } catch (error) {
    console.error('Error joining session:', error);
    res.status(500).json({ error: 'Failed to join session' });
  }
};

exports.leaveSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.removeParticipant(req.user.id);

    const participants = await session.getParticipants();
    if (participants.length === 0) {
      await exports.deleteSession(id, req.io);
    }

    res.status(200).json({ message: 'Left session successfully' });
  } catch (error) {
    console.error('Error leaving session:', error);
    res.status(500).json({ error: 'Failed to leave session' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, password } = req.body;
    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : session.password;
    await session.update({ name, description, password: hashedPassword });
    res.status(200).json({ message: 'Session updated successfully' });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      include: [{ model: User, as: 'participants' }],
    });
    console.log('Fetched sessions:', sessions);
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};


exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByPk(id, {
      include: [
        { model: User, as: 'participants' },
        { model: Map },
        { model: Character, as: 'character' },
      ],
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};

exports.deleteSession = async (sessionId, io) => {
  try {
    const session = await Session.findByPk(sessionId);
    if (session) {
      await session.destroy();
      console.log(`Session with id ${sessionId} deleted`);
      io.emit('sessionDeleted', sessionId);
    } else {
      console.log(`Session with id ${sessionId} not found`);
    }
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};