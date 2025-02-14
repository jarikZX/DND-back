const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
