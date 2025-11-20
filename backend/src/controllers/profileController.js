const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		let profile = await Profile.findOne({ user: userId });
		if (!profile) {
			profile = await Profile.create({ user: userId, strengths: [], triggers: [] });
		}
		return res.json(profile);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};
