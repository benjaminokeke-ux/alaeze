import { FiTrendingUp, FiEye, FiUsers, FiDollarSign, FiClock, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CREATOR_TIER_DETAILS, CREATOR_TIERS } from '../../utils/constants';
import InfoTooltip from '../../components/ui/InfoTooltip';

export default function CreatorDashboard() {
  const { user } = useAuth();
  const tier = user?.creatorTier || CREATOR_TIERS.STARTER;
  const tierInfo = CREATOR_TIER_DETAILS[tier];

  const stats = [
    { label: 'Total Views', value: '125.4K', change: '+12%', icon: FiEye, color: 'text-redd-400', tooltip: 'The total number of times your content has been loaded and watched for at least 3 seconds.' },
    { label: 'Subscribers', value: '8,234', change: '+5%', icon: FiUsers, color: 'text-gold-400', tooltip: 'Users who follow your channel and receive notifications about your new uploads.' },
    { label: 'Revenue', value: '$2,847', change: '+18%', icon: FiDollarSign, color: 'text-green-400', tooltip: 'Total earnings from ad revenue, subscriber contributions, and platform bonuses for this period.' },
    { label: 'Watch Time', value: '4,521h', change: '+8%', icon: FiClock, color: 'text-blue-400', tooltip: 'Cumulative hours viewers have spent watching your content. Higher watch time increases your visibility in recommendations.' },
  ];

  const recentContent = [
    { title: 'Atlanta After Dark Ep. 5', views: '12.3K', status: 'published', daysAgo: 2 },
    { title: 'Behind the Scenes: Studio', views: '8.1K', status: 'published', daysAgo: 5 },
    { title: 'Live Q&A Replay', views: '5.7K', status: 'published', daysAgo: 7 },
    { title: 'New Series Teaser', views: '0', status: 'scheduled', daysAgo: -1 },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">
            Welcome back, {user?.name?.split(' ')[0] || 'Creator'} 🔥
          </h1>
          <p className="text-dark-400 mt-1">Here's how your content is performing</p>
        </div>
        <Link to="/creator/upload" className="btn-primary mt-4 md:mt-0 text-center">
          + Upload Content
        </Link>
      </div>

      {/* Creator Tier Card */}
      <div className="card p-6 mb-8 bg-gradient-to-r from-dark-800 to-redd-950/30 border-redd-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm">Creator Tier</p>
            <h3 className="text-xl font-display font-bold gradient-text">{tierInfo.name}</h3>
            <p className="text-dark-400 text-sm mt-1">{tierInfo.revenueShare}% revenue share</p>
          </div>
          <div className="text-right">
            <p className="text-dark-400 text-sm">Next tier at</p>
            <p className="font-bold text-gold-400">
              {tier === CREATOR_TIERS.ELITE ? 'Max tier reached!' : `${CREATOR_TIER_DETAILS[getNextTier(tier)]?.minFollowers?.toLocaleString()} followers`}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-redd-600 to-gold-500 rounded-full" style={{ width: '65%' }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color, tooltip }) => (
          <div key={label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Icon size={20} className={color} />
                <InfoTooltip text={tooltip} />
              </div>
              <span className="text-green-400 text-xs font-medium">{change}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-dark-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Content */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Recent Content</h3>
          <Link to="/creator/content" className="text-redd-400 text-sm font-medium">View All</Link>
        </div>
        <div className="space-y-3">
          {recentContent.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-dark-700 last:border-0">
              <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                <FiPlay size={16} className="text-dark-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-dark-400 text-xs">
                  {item.daysAgo > 0 ? `${item.daysAgo} days ago` : 'Scheduled'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{item.views} views</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-gold-500/20 text-gold-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getNextTier(current) {
  const tiers = Object.values(CREATOR_TIERS);
  const idx = tiers.indexOf(current);
  return tiers[Math.min(idx + 1, tiers.length - 1)];
}
