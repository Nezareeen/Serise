require('dotenv').config();
module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  openaiKey: process.env.OPENAI_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
};
