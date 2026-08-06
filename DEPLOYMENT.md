# Alaeze — Deployment & User Testing Guide

## Quick Deploy for Beta Testing

### Option A: Vercel (Frontend) + Railway (Backend)

**Step 1: Deploy Backend on Railway**

1. Go to [railway.app](https://railway.app) and sign up (GitHub login)
2. Click "New Project" → "Deploy from GitHub Repo"
3. Select this repository, set the root directory to `server/`
4. Add environment variables:
   - `PORT` = `5000`
   - `MONGODB_URI` = (Railway provides a free MongoDB — click "Add Plugin" → MongoDB)
   - `JWT_SECRET` = (generate a random string)
5. Railway auto-deploys. Copy your backend URL (e.g., `https://alaeze-server.up.railway.app`)

**Step 2: Deploy Frontend on Vercel**

1. Go to [vercel.com](https://vercel.com) and sign up (GitHub login)
2. Import this repository, set root directory to `client/`
3. Set the environment variable:
   - `VITE_API_URL` = your Railway backend URL
4. Update `client/vercel.json` — replace `your-backend-url.railway.app` with your actual backend URL
5. Deploy. Vercel gives you a URL like `https://alaeze.vercel.app`

**Step 3: Share with Testers**

Share the Vercel URL with your beta testers. They can register, explore, and submit feedback.

---

### Option B: Render (All-in-One)

1. Go to [render.com](https://render.com)
2. Create a "Web Service" from your GitHub repo
3. Set root to `server/`, build command: `npm install`, start: `node server.js`
4. Create a "Static Site" for the client, root: `client/`, build: `npm run build`, publish: `dist`
5. Add a redirect rule on the static site: `/*` → `/index.html` (200 status)

---

## User Testing Framework

### Built-in Beta Features

The app includes a complete beta testing toolkit:

1. **Beta Banner** — Gradient banner at the top reminding users they're in a test environment
2. **Feedback Widget** — Floating button (bottom-right) that opens a feedback form with:
   - Feedback type (General, Bug, Feature Idea, UX Issue)
   - Star rating (1-5)
   - Free-text message
   - Auto-captures page URL, viewport size, device type
3. **Analytics Engine** — Lightweight event tracking that captures:
   - Session starts/ends with duration
   - Page views
   - Feature usage
   - Content interactions (play, like, save, share)
   - Dwell time on content

### Viewing Beta Data

Hit these endpoints on your backend to see collected data:

```
GET /api/analytics/summary     → Overview (sessions, events, avg rating)
GET /api/analytics/feedback    → All feedback submissions
GET /api/analytics/events      → Raw event log
GET /api/analytics/events?event=feature_use  → Filter by event type
```

### Suggested Testing Script

Share this with your beta testers:

---

**Hey! Welcome to the Alaeze beta 🧪**

Here's what we'd love you to try:

1. **Register** — Try both "Watch" and "Both" account types
2. **Browse content** — Explore the home page, browse by type
3. **Watch a Vertical Drama** — Swipe through episodes, try the lock screen
4. **Try Party Watch** — Start a party from the home page
5. **Switch to Creator Studio** — Upload something, check analytics
6. **Check your Profile** — See your stats, try settings

After each section, tap the **red chat bubble** (bottom-right) to tell us:
- What confused you?
- What felt broken?
- What did you love?
- What's missing?

---

### Metrics to Track

| Metric | What it tells you |
|--------|-------------------|
| Session duration | Are people staying or bouncing? |
| Feature usage frequency | Which features are discoverable? |
| Feedback types | Bug-heavy = quality issues. UX-heavy = design issues. |
| Star ratings | General sentiment over time |
| Page views per session | Exploration depth |
| Drop-off pages | Where people leave |
| Vertical drama completion | Are people swiping through? |

### Cohort Ideas

- **Cohort A**: Viewers only (test subscriber experience)
- **Cohort B**: Creators only (test upload & analytics)
- **Cohort C**: Both roles (test seamless switching)
- **Cohort D**: Mobile-only users (test vertical drama native feel)
- **Cohort E**: Desktop users (test layout adaptations)

### Timeline Template

| Week | Focus | Testers |
|------|-------|---------|
| 1 | Core flow (register, browse, watch) | 5-10 friends |
| 2 | Creator features + vertical dramas | 10-20 targeted |
| 3 | Social features (party watch, friends) | 20-50 mixed |
| 4 | Full stress test + edge cases | 50-100 open beta |
