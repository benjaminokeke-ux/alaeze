# 🔴 Alaeze

A mobile-friendly, web-based streaming service featuring independent content — docuseries, movies, mini-series, vertical dramas, social media reels, podcasts, visual art, and live streams.

Built with the bold, unapologetic energy of Karlie.

## Features

### Creator Portal
- Upload & manage content (video, audio, art, live streams)
- Engagement tiers for monetization
- Performance analytics (views, dwell time, conversions, comments)
- Content scheduling & management

### Subscriber Portal
- Subscription tiers (Free/Ad-supported, Premium, VIP)
- Personalized content library
- Friend connections & social features
- Auto-generated & friend recommendations
- Party Watch (simultaneous streaming with friends)
- Customizable profile & preferences

## Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS (mobile-first)
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB with Mongoose
- **Auth:** JWT with role-based access
- **Media:** AWS S3-compatible storage
- **Real-time:** Socket.IO for live streams & party watch

## Getting Started

```bash
# Install all dependencies
npm run install:all

# Run development servers
npm run dev
```

## Project Structure

```
alaeze/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
├── server/          # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   └── services/
└── shared/          # Shared types & constants
```

## Brand Identity

Alaeze channels Karlie's signature style:
- Bold reds, blacks, and golds
- Confident, glamorous aesthetic
- Unapologetic personality
- Atlanta-inspired energy
