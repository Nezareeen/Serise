const ScriptTemplate = require('../models/ScriptTemplate');

exports.create = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { title, content } = req.body;
    const s = await ScriptTemplate.create({ user: userId, title, content });
    return res.json(s);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.list = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const items = await ScriptTemplate.find({ user: userId }).sort({ createdAt: -1 }).limit(200);
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await ScriptTemplate.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await ScriptTemplate.findByIdAndDelete(id);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'server error' });
  }
};
