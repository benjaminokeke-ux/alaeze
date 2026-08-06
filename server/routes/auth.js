import { Router } from 'express';
import { authenticate, generateToken } from '../middleware/auth.js';

const router = Router();

// In-memory store for demo (MongoDB used in production)
const users = [];
let nextId = 1;

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, accountType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existing = users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const resolvedAccountType = accountType || 'both';

    const user = {
      id: String(nextId++),
      _id: String(nextId - 1),
      name,
      email: email.toLowerCase(),
      password, // In production, hashed via mongoose pre-save
      role: 'user',
      accountType: resolvedAccountType,
      creatorEnabled: resolvedAccountType === 'creator' || resolvedAccountType === 'both',
      subscription: 'free',
      creatorTier: 'starter',
      avatar: null,
      friends: [],
      createdAt: new Date(),
    };
    users.push(user);

    const token = generateToken(user);
    const { password: _, ...publicUser } = user;

    res.status(201).json({ token, user: publicUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email?.toLowerCase());
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { password: _, ...publicUser } = user;

    res.json({ token, user: publicUser });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password: _, ...publicUser } = user;
  res.json({ user: publicUser });
});

router.put('/profile', authenticate, (req, res) => {
  const idx = users.findIndex((u) => u.id === req.user.id);
  if (idx === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, avatar, preferences, creatorEnabled, accountType } = req.body;
  if (name) users[idx].name = name;
  if (avatar) users[idx].avatar = avatar;
  if (preferences) users[idx].preferences = { ...users[idx].preferences, ...preferences };
  if (creatorEnabled !== undefined) {
    users[idx].creatorEnabled = creatorEnabled;
    if (creatorEnabled && users[idx].accountType === 'viewer') {
      users[idx].accountType = 'both';
    }
  }
  if (accountType) {
    users[idx].accountType = accountType;
    users[idx].creatorEnabled = accountType === 'creator' || accountType === 'both';
  }

  const { password: _, ...publicUser } = users[idx];
  res.json({ user: publicUser });
});

export default router;
