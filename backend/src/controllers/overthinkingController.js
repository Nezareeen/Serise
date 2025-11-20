const OverthinkingEntry = require('../models/OverthinkingEntry');
const aiService = require('../services/aiService');

exports.submit = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const { thought } = req.body;
		// generate AI response (may be stub)
		const ai = await aiService.analyze(thought, { userId });
		const entry = await OverthinkingEntry.create({ user: userId, thought, aiResponse: ai.text || JSON.stringify(ai) });
		return res.json(entry);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};

exports.list = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const items = await OverthinkingEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(100);
		return res.json(items);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};
