const aiService = require('../services/aiService');

exports.run = async (req, res) => {
	try {
		const { prompt, scenario } = req.body;
		const result = await aiService.simulate(prompt || '', { scenario });
		return res.json({ result });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};
