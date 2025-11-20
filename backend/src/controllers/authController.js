const User = require('../models/User');
const { hash, compare } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		if (!email || !password) return res.status(400).json({ msg: 'email and password required' });
		const existing = await User.findOne({ email });
		if (existing) return res.status(409).json({ msg: 'email already registered' });
		const passwordHash = hash(password);
		const user = await User.create({ email, passwordHash, name });
		const token = generateToken({ id: user._id });
		return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ msg: 'email and password required' });
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ msg: 'invalid credentials' });
		const ok = compare(password, user.passwordHash);
		if (!ok) return res.status(401).json({ msg: 'invalid credentials' });
		const token = generateToken({ id: user._id });
		return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'server error' });
	}
};
