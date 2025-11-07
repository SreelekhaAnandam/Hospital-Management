const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Temporary debug endpoint to list users. Only enabled when NODE_ENV !== 'production'.
// Requires header 'x-debug-token' to match process.env.DEBUG_TOKEN or fallback token.
router.get('/users', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ message: 'Not found' });
    }

    const token = req.header('x-debug-token') || '';
    const allowed = process.env.DEBUG_TOKEN || 'local-debug-token';
    if (token !== allowed) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const users = await User.find().select('username email role createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
