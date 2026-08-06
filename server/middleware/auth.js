import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alaeze-dev-secret';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
}

export function generateToken(user) {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, creatorEnabled: user.creatorEnabled },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
