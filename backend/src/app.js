const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const energyRoutes = require('./routes/energyRoutes');
const overthinkingRoutes = require('./routes/overthinkingRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/overthinking', overthinkingRoutes);
app.use('/api/simulate', simulationRoutes);
app.use('/api/profile', profileRoutes);

app.get('/health', (req,res) => res.json({ok:true}));

module.exports = app;
