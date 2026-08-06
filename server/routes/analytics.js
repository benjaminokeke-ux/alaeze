import { Router } from 'express';

const router = Router();

// In-memory stores for beta (swap for DB in production)
const events = [];
const feedback = [];

// Receive batched analytics events
router.post('/events', (req, res) => {
  const { events: incoming } = req.body;
  if (Array.isArray(incoming)) {
    events.push(...incoming);
    // Keep only last 10000 events in memory
    if (events.length > 10000) events.splice(0, events.length - 10000);
  }
  res.json({ received: incoming?.length || 0 });
});

// Receive user feedback
router.post('/feedback', (req, res) => {
  const entry = {
    id: `fb_${Date.now()}`,
    ...req.body,
    receivedAt: new Date().toISOString(),
  };
  feedback.push(entry);
  console.log('[Beta Feedback]', entry.type, '-', entry.message?.slice(0, 80));
  res.json({ id: entry.id, status: 'received' });
});

// Dashboard endpoint — view collected feedback (admin only in production)
router.get('/feedback', (req, res) => {
  res.json({
    total: feedback.length,
    items: feedback.slice(-50).reverse(),
  });
});

// Dashboard endpoint — view event summary
router.get('/summary', (req, res) => {
  const summary = {
    totalEvents: events.length,
    totalFeedback: feedback.length,
    uniqueSessions: new Set(events.map((e) => e.sessionId).filter(Boolean)).size,
    eventBreakdown: {},
    feedbackByType: {},
    avgRating: 0,
  };

  // Event breakdown
  for (const event of events) {
    summary.eventBreakdown[event.event] = (summary.eventBreakdown[event.event] || 0) + 1;
  }

  // Feedback breakdown
  let ratingSum = 0;
  let ratingCount = 0;
  for (const fb of feedback) {
    summary.feedbackByType[fb.type] = (summary.feedbackByType[fb.type] || 0) + 1;
    if (fb.rating > 0) {
      ratingSum += fb.rating;
      ratingCount++;
    }
  }
  summary.avgRating = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : 'N/A';

  res.json(summary);
});

// Dashboard endpoint — view recent events
router.get('/events', (req, res) => {
  const { limit = 100, event: eventFilter } = req.query;
  let filtered = events;
  if (eventFilter) {
    filtered = events.filter((e) => e.event === eventFilter);
  }
  res.json({
    total: filtered.length,
    items: filtered.slice(-Number(limit)).reverse(),
  });
});

export default router;
