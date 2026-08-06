export const CONTENT_TYPES = {
  DOCUSERIES: 'docuseries',
  MOVIE: 'movie',
  MINI_SERIES: 'mini-series',
  VERTICAL_DRAMA: 'vertical-drama',
  REEL: 'reel',
  PODCAST: 'podcast',
  VISUAL_ART: 'visual-art',
  LIVE_STREAM: 'live-stream',
};

export const CONTENT_TYPE_LABELS = {
  [CONTENT_TYPES.DOCUSERIES]: 'Docuseries',
  [CONTENT_TYPES.MOVIE]: 'Movie',
  [CONTENT_TYPES.MINI_SERIES]: 'Mini-Series',
  [CONTENT_TYPES.VERTICAL_DRAMA]: 'Vertical Drama',
  [CONTENT_TYPES.REEL]: 'Reel',
  [CONTENT_TYPES.PODCAST]: 'Podcast',
  [CONTENT_TYPES.VISUAL_ART]: 'Visual Art',
  [CONTENT_TYPES.LIVE_STREAM]: 'Live Stream',
};

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
  VIP: 'vip',
};

export const SUBSCRIPTION_DETAILS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    name: 'Free',
    price: 0,
    description: 'Ad-supported access to select content',
    features: ['Limited content library', 'Ad-supported viewing', 'Basic recommendations'],
  },
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    name: 'Premium',
    price: 9.99,
    description: 'Full access with minimal ads',
    features: [
      'Full content library',
      'Reduced ads',
      'HD streaming',
      'Friend connections',
      'Party Watch (up to 4)',
      'Personalized recommendations',
    ],
  },
  [SUBSCRIPTION_TIERS.VIP]: {
    name: 'VIP',
    price: 19.99,
    description: 'The ultimate Alaeze experience',
    features: [
      'Everything in Premium',
      'No ads',
      '4K streaming',
      'Early access to new content',
      'Exclusive creator content',
      'Party Watch (up to 10)',
      'Priority support',
      'Custom profile themes',
    ],
  },
};

export const CREATOR_TIERS = {
  STARTER: 'starter',
  RISING: 'rising',
  ESTABLISHED: 'established',
  ELITE: 'elite',
};

export const CREATOR_TIER_DETAILS = {
  [CREATOR_TIERS.STARTER]: {
    name: 'Starter',
    minFollowers: 0,
    revenueShare: 50,
    features: ['Basic analytics', 'Standard uploads', 'Community tab'],
  },
  [CREATOR_TIERS.RISING]: {
    name: 'Rising',
    minFollowers: 1000,
    revenueShare: 60,
    features: ['Advanced analytics', 'Priority uploads', 'Live streaming', 'Custom thumbnails'],
  },
  [CREATOR_TIERS.ESTABLISHED]: {
    name: 'Established',
    minFollowers: 10000,
    revenueShare: 70,
    features: ['Full analytics suite', 'Premiere events', 'Merch integration', 'Custom channel page'],
  },
  [CREATOR_TIERS.ELITE]: {
    name: 'Elite',
    minFollowers: 100000,
    revenueShare: 80,
    features: ['Everything + dedicated support', 'Platform promotion', 'Revenue bonuses', 'Brand partnerships'],
  },
};
