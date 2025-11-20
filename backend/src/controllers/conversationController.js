const Conversation = require('../models/Conversation');

exports.create = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const { summary, mood, tags } = req.body;
		const conv = await Conversation.create({ user: userId, summary, mood, tags });
		return res.json(conv);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};

exports.list = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const items = await Conversation.find({ user: userId }).sort({ createdAt: -1 }).limit(50);
		return res.json(items);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};
