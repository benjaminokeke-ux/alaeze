import { FiUsers, FiStar, FiTrendingUp, FiAward } from 'react-icons/fi';
import { CREATOR_TIERS, CREATOR_TIER_DETAILS } from '../../utils/constants';
import InfoTooltip from '../../components/ui/InfoTooltip';

export default function CreatorEngagement() {
  const tiers = Object.entries(CREATOR_TIER_DETAILS);

  const engagementStats = [
    { label: 'Active Subscribers', value: '8,234', icon: FiUsers, tooltip: 'Subscribers who have watched at least one of your videos in the past 30 days.' },
    { label: 'Engagement Rate', value: '12.4%', icon: FiTrendingUp, tooltip: 'The percentage of viewers who interact with your content (likes, comments, shares, saves) relative to total views.' },
    { label: 'Avg. Interactions/Post', value: '342', icon: FiStar, tooltip: 'The average number of combined interactions (likes, comments, shares) each piece of your content receives.' },
    { label: 'Community Score', value: '94/100', icon: FiAward, tooltip: 'A platform-calculated score reflecting your community health based on comment sentiment, return viewers, and interaction diversity.' },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-display font-bold mb-2">Engagement</h1>
      <p className="text-dark-400 mb-8">Grow your audience and unlock rewards</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {engagementStats.map(({ label, value, icon: Icon, tooltip }) => (
          <div key={label} className="card p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={20} className="text-redd-400" />
              <InfoTooltip text={tooltip} />
            </div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-dark-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Creator Tiers */}
      <h2 className="text-xl font-display font-bold mb-4">Creator Tiers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tiers.map(([tier, details], i) => (
          <div key={tier} className={`card p-6 ${i === 0 ? 'border-redd-500' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-lg">{details.name}</h3>
              <span className="badge-gold">{details.revenueShare}% rev share</span>
            </div>
            <p className="text-dark-400 text-sm mb-3">
              {details.minFollowers === 0
                ? 'Starting tier for all creators'
                : `Requires ${details.minFollowers.toLocaleString()}+ followers`}
            </p>
            <ul className="space-y-2">
              {details.features.map((f) => (
                <li key={f} className="text-sm text-dark-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-redd-400 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recent Interactions */}
      <h2 className="text-xl font-display font-bold mb-4">Recent Interactions</h2>
      <div className="card p-6">
        <div className="space-y-4">
          {[
            { user: 'Diamond', action: 'subscribed to your channel', time: '2m ago' },
            { user: 'Marcus', action: 'commented on Atlanta After Dark', time: '15m ago' },
            { user: 'Jasmine', action: 'shared The Come Up with 3 friends', time: '1h ago' },
            { user: 'Dre', action: 'started a Party Watch of your content', time: '2h ago' },
            { user: 'Keisha', action: 'liked 5 of your videos', time: '3h ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-dark-700/50 last:border-0">
              <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-dark-300">{item.user.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-redd-400">{item.user}</span>{' '}
                  <span className="text-dark-300">{item.action}</span>
                </p>
              </div>
              <span className="text-dark-500 text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
