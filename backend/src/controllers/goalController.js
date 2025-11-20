const Goal = require('../models/Goal');

exports.create = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { title, cadence } = req.body;
    const g = await Goal.create({ user: userId, title, cadence, progress: 0 });
    return res.json(g);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.list = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const items = await Goal.find({ user: userId }).sort({ createdAt: -1 }).limit(200);
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Goal.findByIdAndDelete(id);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};
