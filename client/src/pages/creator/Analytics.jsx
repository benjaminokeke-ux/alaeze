import { useState } from 'react';
import { FiEye, FiClock, FiTrendingUp, FiUsers, FiRepeat, FiMessageCircle } from 'react-icons/fi';
import InfoTooltip from '../../components/ui/InfoTooltip';

export default function CreatorAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = [
    { label: 'Total Views', value: '45.2K', change: '+12.3%', icon: FiEye, tooltip: 'The total number of times your content has been loaded and watched for at least 3 seconds.' },
    { label: 'Avg. Dwell Time', value: '8m 42s', change: '+5.1%', icon: FiClock, tooltip: 'The average amount of time viewers spend watching a single piece of your content before navigating away.' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', icon: FiTrendingUp, tooltip: 'The percentage of viewers who take a desired action after watching, such as subscribing, following, or upgrading their plan.' },
    { label: 'New Subscribers', value: '234', change: '+18%', icon: FiUsers, tooltip: 'The number of new users who subscribed to your channel during this time period.' },
    { label: 'Content Crossover', value: '22%', change: '+3%', icon: FiRepeat, tooltip: 'The percentage of viewers who watched one of your videos and then went on to watch another piece of your content.' },
    { label: 'Comments', value: '1,847', change: '+25%', icon: FiMessageCircle, tooltip: 'Total comments left on your content. Higher engagement signals stronger audience connection.' },
  ];

  const topContent = [
    { title: 'Atlanta After Dark Ep. 5', views: '12.3K', dwellTime: '12m 30s', conversion: '5.2%' },
    { title: 'Behind the Scenes', views: '8.1K', dwellTime: '6m 15s', conversion: '3.1%' },
    { title: 'Live Q&A Replay', views: '5.7K', dwellTime: '22m 45s', conversion: '4.8%' },
    { title: 'Studio Sessions Ep. 3', views: '4.9K', dwellTime: '9m 10s', conversion: '2.9%' },
    { title: 'The Come Up Trailer', views: '3.2K', dwellTime: '1m 45s', conversion: '6.1%' },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <p className="text-dark-400 mt-1">Track your content performance</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mt-4 md:mt-0">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-redd-600 text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {metrics.map(({ label, value, change, icon: Icon, tooltip }) => (
          <div key={label} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={18} className="text-redd-400" />
              <span className="text-dark-400 text-sm">{label}</span>
              <InfoTooltip text={tooltip} />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-green-400 text-xs mt-1">{change} vs last period</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="card p-6 mb-8">
        <h3 className="font-semibold mb-4">Views Over Time</h3>
        <div className="h-48 flex items-end gap-1">
          {Array.from({ length: 30 }, (_, i) => {
            const height = 20 + Math.random() * 80;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-redd-600 to-redd-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${height}%` }}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-dark-500 text-xs">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Top Content Table */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-dark-400 border-b border-dark-700">
                <th className="text-left py-3 font-medium">Content</th>
                <th className="text-right py-3 font-medium">
                  <span className="inline-flex items-center gap-1">Views <InfoTooltip text="Total number of unique views for this content." /></span>
                </th>
                <th className="text-right py-3 font-medium hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1">Dwell Time <InfoTooltip text="Average time a viewer spends watching this specific content before leaving." /></span>
                </th>
                <th className="text-right py-3 font-medium">
                  <span className="inline-flex items-center gap-1">Conversion <InfoTooltip text="Percentage of viewers who subscribed to your channel or upgraded their plan after watching this content." /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((item, i) => (
                <tr key={i} className="border-b border-dark-700/50 last:border-0">
                  <td className="py-3 font-medium">{item.title}</td>
                  <td className="py-3 text-right text-dark-300">{item.views}</td>
                  <td className="py-3 text-right text-dark-300 hidden sm:table-cell">{item.dwellTime}</td>
                  <td className="py-3 text-right">
                    <span className="text-green-400">{item.conversion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            Subscription Conversions
            <InfoTooltip text="Tracks how many viewers upgraded their subscription tier after watching your content. A key measure of your content's ability to drive paid engagement." />
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-dark-300 text-sm">Free → Premium</span>
              <span className="font-medium">142 users</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-redd-500 rounded-full" style={{ width: '68%' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-300 text-sm">Premium → VIP</span>
              <span className="font-medium">47 users</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 rounded-full" style={{ width: '32%' }} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            Content Crossover
            <InfoTooltip text="Shows what other creators' content your audience also watches. Use this to identify collaboration opportunities and understand your audience's tastes." />
          </h3>
          <p className="text-dark-400 text-sm mb-3">
            Viewers who watched your content also watched:
          </p>
          <div className="space-y-2">
            {['Queens of the South (34%)', 'Boss Moves (28%)', 'Real Talk Live (22%)'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-redd-400 rounded-full" />
                <span className="text-dark-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
