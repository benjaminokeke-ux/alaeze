import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Demo content store
const contentItems = generateDemoContent();

router.get('/feed', authenticate, (req, res) => {
  const featured = contentItems[0];
  const sections = [
    { title: 'Trending Now 🔥', items: contentItems.slice(0, 8) },
    { title: 'Recommended for You', items: contentItems.slice(4, 12) },
    { title: 'New Releases', items: contentItems.slice(8, 16) },
    { title: 'Friends Are Watching', items: contentItems.slice(2, 10) },
  ];
  const verticalDramas = generateVerticalDramas();
  res.json({ featured, sections, verticalDramas });
});

router.get('/browse', authenticate, (req, res) => {
  const { type, search, page = 1, limit = 20 } = req.query;
  let items = [...contentItems];

  if (type && type !== 'all') {
    items = items.filter((c) => c.type === type);
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter((c) => c.title.toLowerCase().includes(q));
  }

  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + Number(limit));

  res.json({ items: paginated, total: items.length, page: Number(page) });
});

router.get('/:id', authenticate, (req, res) => {
  const content = contentItems.find((c) => c._id === req.params.id);
  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }

  // Track view
  content.views = (content.views || 0) + 1;

  const comments = [
    { _id: '1', user: { name: 'Diamond' }, text: 'This is fire 🔥', createdAt: new Date() },
    { _id: '2', user: { name: 'Marcus' }, text: 'ATL represent!', createdAt: new Date() },
  ];

  res.json({ content, comments });
});

router.post('/', authenticate, (req, res) => {
  const { title, description, type, tags, visibility } = req.body;

  const newContent = {
    _id: `content-${Date.now()}`,
    title,
    description,
    type,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
    visibility: visibility || 'public',
    creator: { _id: req.user.id, name: 'You' },
    status: 'published',
    views: 0,
    likes: 0,
    duration: 0,
    thumbnail: null,
    createdAt: new Date(),
  };

  contentItems.unshift(newContent);
  res.status(201).json({ content: newContent });
});

export default router;

function generateDemoContent() {
  const types = ['docuseries', 'movie', 'mini-series', 'vertical-drama', 'reel', 'podcast', 'visual-art', 'live-stream'];
  const titles = [
    'Atlanta After Dark', 'Queens of the South', 'Midnight Hustle',
    'The Come Up', 'Studio Sessions', 'Real Talk Live',
    'Art After Hours', 'Boss Moves', 'Untold Stories',
    'The Glow Up', 'Behind the Beat', 'City Lights',
    'Hustle & Heart', 'The Takeover', 'Vibe Check', 'No Filter',
  ];

  return titles.map((title, i) => ({
    _id: `demo-${i + 1}`,
    title,
    description: `An exclusive ${types[i % types.length]} exploring bold stories and independent voices.`,
    type: types[i % types.length],
    creator: { _id: `creator-${(i % 5) + 1}`, name: `Creator ${(i % 5) + 1}` },
    thumbnail: null,
    duration: Math.floor(Math.random() * 120) + 5,
    views: Math.floor(Math.random() * 100000),
    likes: Math.floor(Math.random() * 5000),
    status: 'published',
    tags: ['trending', 'independent'],
    createdAt: new Date(Date.now() - i * 86400000),
  }));
}

function generateVerticalDramas() {
  const titles = [
    'The Betrayal', 'Stolen Crown', 'Secret Heir', 'Vengeful Heart',
    'Empire Falls', 'The Switch', 'Gold Digger', 'Last Vow',
    'Tangled Lies', 'The Arrangement',
  ];
  return titles.map((title, i) => ({
    _id: `vd-${i + 1}`,
    title,
    type: 'vertical-drama',
    thumbnail: null,
    creator: { _id: `studio-${i + 1}`, name: `Studio ${i + 1}` },
    views: Math.floor(Math.random() * 200000) + 50000,
    duration: 2,
    episodes: Math.floor(Math.random() * 60) + 20,
  }));
}
