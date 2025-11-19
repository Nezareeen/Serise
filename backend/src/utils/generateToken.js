const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

module.exports = function generateToken(payload){
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
};
