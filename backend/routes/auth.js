const express = require('express');
const router = express.Router();

// Admin credentials (can also be configured via environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'homecook123';
const ADMIN_TOKEN = 'homecook_secret_token_774921a';

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password.' });
  }

  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: 'Authentication successful',
      token: ADMIN_TOKEN,
      user: {
        username: ADMIN_USERNAME,
        role: 'Kitchen Administrator'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please check your username and password.'
  });
});

// GET /api/admin/verify
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ valid: false, message: 'No authorization token provided' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (token === ADMIN_TOKEN) {
    return res.json({ valid: true, user: { username: ADMIN_USERNAME, role: 'Kitchen Administrator' } });
  }

  return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
});

module.exports = router;

