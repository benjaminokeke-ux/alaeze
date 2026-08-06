import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticate, (req, res) => {
  res.json({
    totalViews: 125400,
    subscribers: 8234,
    revenue: 2847.50,
    watchTime: 4521,
    engagementRate: 12.4,
    conversionRate: 3.8,
  });
});

router.get('/analytics', authenticate, (req, res) => {
  const { range = '7d' } = req.query;
  const days = range === '24h' ? 1 : range === '7d' ? 7 : range === '30d' ? 30 : 90;

  const viewsOverTime = Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 86400000).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 5000) + 500,
    watchTime: Math.floor(Math.random() * 200) + 50,
  }));

  res.json({
    viewsOverTime,
    topContent: [
      { title: 'Atlanta After Dark Ep. 5', views: 12300, dwellTime: 750, conversion: 5.2 },
      { title: 'Behind the Scenes', views: 8100, dwellTime: 375, conversion: 3.1 },
      { title: 'Live Q&A Replay', views: 5700, dwellTime: 1365, conversion: 4.8 },
    ],
    audienceInsights: {
      subscriptionConversions: { freeToPremium: 142, premiumToVip: 47 },
      contentCrossover: [
        { title: 'Queens of the South', percentage: 34 },
        { title: 'Boss Moves', percentage: 28 },
      ],
    },
  });
});

router.get('/engagement', authenticate, (req, res) => {
  res.json({
    tier: 'starter',
    followers: 8234,
    interactions: [
      { user: 'Diamond', action: 'subscribed', time: '2m ago' },
      { user: 'Marcus', action: 'commented', time: '15m ago' },
      { user: 'Jasmine', action: 'shared with 3 friends', time: '1h ago' },
    ],
  });
});

export default router;
