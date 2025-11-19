const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

module.exports = function(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({msg:'no token'});
  const token = auth.split(' ')[1];
  try{
    req.user = jwt.verify(token, jwtSecret);
    next();
  }catch(e){
    return res.status(401).json({msg:'invalid token'});
  }
};
