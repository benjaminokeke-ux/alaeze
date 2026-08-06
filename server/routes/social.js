import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/friends', authenticate, (req, res) => {
  const friends = [
    { id: '1', name: 'Diamond Jackson', status: 'online', watching: 'Atlanta After Dark' },
    { id: '2', name: 'Marcus Williams', status: 'offline', watching: null },
    { id: '3', name: 'Jasmine Carter', status: 'online', watching: 'The Come Up' },
    { id: '4', name: 'Dre Thompson', status: 'online', watching: null },
    { id: '5', name: 'Keisha Brown', status: 'away', watching: 'Boss Moves' },
  ];
  res.json({ friends });
});

router.get('/recommendations', authenticate, (req, res) => {
  const recommendations = [
    { id: '1', contentId: 'demo-2', title: 'Queens of the South', friendName: 'Diamond', reason: 'Must watch!' },
    { id: '2', contentId: 'demo-5', title: 'Studio Sessions', friendName: 'Marcus', reason: 'The beats are insane' },
    { id: '3', contentId: 'demo-10', title: 'The Glow Up', friendName: 'Jasmine', reason: 'Literally me' },
  ];
  res.json({ recommendations });
});

router.post('/friend-request', authenticate, (req, res) => {
  const { userId } = req.body;
  res.json({ message: 'Friend request sent', userId });
});

router.post('/party', authenticate, (req, res) => {
  const { contentId, invitees } = req.body;
  const partyId = `party-${Date.now()}`;
  res.json({ partyId, contentId, invitees, status: 'created' });
});

export default router;
