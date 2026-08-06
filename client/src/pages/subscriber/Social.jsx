import { useState } from 'react';
import { FiUserPlus, FiMessageCircle, FiUsers, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Social() {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends = generateDemoFriends();
  const recommendations = generateFriendRecommendations();

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-display font-bold mb-6">Social</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'friends' ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300'
          }`}
        >
          Friends ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'recommendations' ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300'
          }`}
        >
          Friend Recs
        </button>
        <button
          onClick={() => setActiveTab('find')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'find' ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300'
          }`}
        >
          Find Friends
        </button>
      </div>

      {activeTab === 'find' && (
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or username..."
            className="input-field pl-11"
          />
        </div>
      )}

      {/* Friends List */}
      {activeTab === 'friends' && (
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-redd-600 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{friend.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{friend.name}</p>
                <p className="text-dark-400 text-sm truncate">
                  {friend.watching ? `Watching: ${friend.watching}` : friend.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-dark-700 rounded-lg text-dark-300 hover:text-redd-400" aria-label="Message">
                  <FiMessageCircle size={18} />
                </button>
                <Link
                  to={`/party/new?invite=${friend.id}`}
                  className="p-2 bg-dark-700 rounded-lg text-dark-300 hover:text-redd-400"
                  aria-label="Invite to party"
                >
                  <FiUsers size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Friend Recommendations (from friends) */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <p className="text-dark-400 text-sm mb-4">Content your friends are loving right now</p>
          {recommendations.map((rec) => (
            <Link key={rec.id} to={`/watch/${rec.contentId}`} className="card flex gap-4 items-center">
              <div className="w-16 h-16 bg-dark-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-dark-500 text-xs">🎬</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{rec.title}</p>
                <p className="text-dark-400 text-sm">
                  Recommended by <span className="text-redd-400">{rec.friendName}</span>
                </p>
                <p className="text-dark-500 text-xs mt-1">{rec.reason}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Find Friends */}
      {activeTab === 'find' && (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center">
                <span className="text-dark-400 font-bold">U{i}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">User {i}</p>
                <p className="text-dark-400 text-sm">{Math.floor(Math.random() * 20)} mutual friends</p>
              </div>
              <button className="btn-primary text-sm py-2 px-3 flex items-center gap-1">
                <FiUserPlus size={14} /> Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function generateDemoFriends() {
  return [
    { id: '1', name: 'Diamond Jackson', watching: 'Atlanta After Dark', status: 'Online' },
    { id: '2', name: 'Marcus Williams', watching: null, status: 'Last seen 2h ago' },
    { id: '3', name: 'Jasmine Carter', watching: 'The Come Up', status: 'Online' },
    { id: '4', name: 'Dre Thompson', watching: null, status: 'Online' },
    { id: '5', name: 'Keisha Brown', watching: 'Boss Moves', status: 'Last seen 30m ago' },
  ];
}

function generateFriendRecommendations() {
  return [
    { id: '1', contentId: 'rec-1', title: 'Queens of the South', friendName: 'Diamond', reason: '"This is a must-watch, trust me"' },
    { id: '2', contentId: 'rec-2', title: 'Studio Sessions Ep. 5', friendName: 'Marcus', reason: '"The beat drops are insane"' },
    { id: '3', contentId: 'rec-3', title: 'The Glow Up', friendName: 'Jasmine', reason: '"Literally me fr"' },
    { id: '4', contentId: 'rec-4', title: 'Real Talk Live', friendName: 'Dre', reason: '"Best podcast on the platform"' },
  ];
}
