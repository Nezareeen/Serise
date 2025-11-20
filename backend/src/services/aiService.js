const axios = require('axios');
const { geminiKey, openaiKey } = require('../config/env');

// Basic AI service that uses Gemini (if key provided) or falls back to a simple stub.
exports.analyze = async (text, opts = {}) => {
  if (geminiKey) {
    // Example Gemini integration placeholder. Replace with real REST call if desired.
    try {
      const url = process.env.GEMINI_ENDPOINT || 'https://api.example.com/gemini/analyze';
      const resp = await axios.post(url, { input: text, opts }, { headers: { Authorization: `Bearer ${geminiKey}` } });
      return resp.data;
    } catch (e) {
      console.error('gemini analyze error', e.message);
    }
  }

  if (openaiKey) {
    // Could implement OpenAI fallback here.
  }

  // deterministic stub
  return { text: `Analysis (stub) for: ${text}`, sentiment: 'neutral', notes: [] };
};

exports.simulate = async (prompt, opts = {}) => {
  if (geminiKey) {
    try {
      const url = process.env.GEMINI_ENDPOINT || 'https://api.example.com/gemini/simulate';
      const resp = await axios.post(url, { prompt, opts }, { headers: { Authorization: `Bearer ${geminiKey}` } });
      return resp.data;
    } catch (e) {
      console.error('gemini simulate error', e.message);
    }
  }
  // simple echo stub
  return { reply: `Simulated reply (stub) for prompt: ${prompt}` };
};
