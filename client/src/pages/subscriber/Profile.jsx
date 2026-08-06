import { useState } from 'react';
import { FiEdit2, FiSettings, FiLogOut, FiStar, FiFilm, FiUsers, FiTrendingUp, FiEye, FiDollarSign, FiUpload, FiClock, FiHeart, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { CREATOR_TIER_DETAILS, CREATOR_TIERS } from '../../utils/constants';

export default function Profile() {
  const { user, logout, enableCreatorMode } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');
  const [enablingCreator, setEnablingCreator] = useState(false);

  const isCreatorEnabled = user?.creatorEnabled || user?.accountType === 'creator' || user?.accountType === 'both';
  const tier = user?.creatorTier || CREATOR_TIERS.STARTER;
  const tierInfo = CREATOR_TIER_DETAILS[tier];

  async function handleEnableCreator() {
    setEnablingCreator(true);
    try {
      await enableCreatorMode();
    } catch {
      // handle error
    } finally {
      setEnablingCreator(false);
    }
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-redd-600 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-2xl">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold">{user?.name || 'Alaeze User'}</h1>
            <p className="text-dark-400 text-sm">{user?.email}</p>
            {isCreatorEnabled && (
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-gold text-xs">Creator: {tierInfo.name}</span>
              </div>
            )}
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <p className="font-bold text-lg">24</p>
                <p className="text-dark-400 text-xs">Friends</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">156</p>
                <p className="text-dark-400 text-xs">Watched</p>
              </div>
              {isCreatorEnabled && (
                <div className="text-center">
                  <p className="font-bold text-lg">8.2K</p>
                  <p className="text-dark-400 text-xs">Followers</p>
                </div>
              )}
              <div className="text-center">
                <p className="font-bold text-lg">12</p>
                <p className="text-dark-400 text-xs">Lists</p>
              </div>
            </div>
          </div>
          <button className="p-2 bg-dark-700 rounded-lg text-dark-300 hover:text-white" aria-label="Edit profile">
            <FiEdit2 size={18} />
          </button>
        </div>
      </div>

      {/* Creator Mode CTA (for viewer-only accounts) */}
      {!isCreatorEnabled && (
        <div className="card p-6 mb-6 bg-gradient-to-r from-dark-800 to-redd-950/30 border-redd-800/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg">Want to Create Too?</h3>
              <p className="text-dark-400 text-sm mt-1">
                Add creator capabilities to your account — upload content, track analytics, and earn revenue.
              </p>
            </div>
            <button
              onClick={handleEnableCreator}
              disabled={enablingCreator}
              className="btn-gold whitespace-nowrap disabled:opacity-50"
            >
              {enablingCreator ? 'Enabling...' : 'Add Creator Mode'}
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link to="/home/subscription" className="card p-4 flex items-center gap-3 hover:border-gold-500/50">
          <FiStar size={20} className="text-gold-400" />
          <div>
            <p className="font-medium text-sm">Subscription</p>
            <p className="text-dark-400 text-xs capitalize">{user?.subscription || 'Free'} Plan</p>
          </div>
        </Link>
        <Link to="/home/settings" className="card p-4 flex items-center gap-3 hover:border-dark-500/50">
          <FiSettings size={20} className="text-dark-300" />
          <div>
            <p className="font-medium text-sm">Settings</p>
            <p className="text-dark-400 text-xs">Preferences</p>
          </div>
        </Link>
        {isCreatorEnabled && (
          <Link to="/creator" className="card p-4 flex items-center gap-3 hover:border-redd-500/50 col-span-2">
            <FiUpload size={20} className="text-redd-400" />
            <div>
              <p className="font-medium text-sm">Creator Studio</p>
              <p className="text-dark-400 text-xs">Manage your content & analytics</p>
            </div>
          </Link>
        )}
      </div>

      {/* Viewer Stats — always shown */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FiEye size={18} className="text-blue-400" /> Viewer Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="card p-4 text-center">
            <FiClock size={18} className="text-blue-400 mx-auto mb-1" />
            <p className="font-bold text-lg">342h</p>
            <p className="text-dark-400 text-xs">Watch Time</p>
          </div>
          <div className="card p-4 text-center">
            <FiFilm size={18} className="text-redd-400 mx-auto mb-1" />
            <p className="font-bold text-lg">156</p>
            <p className="text-dark-400 text-xs">Videos Watched</p>
          </div>
          <div className="card p-4 text-center">
            <FiHeart size={18} className="text-pink-400 mx-auto mb-1" />
            <p className="font-bold text-lg">89</p>
            <p className="text-dark-400 text-xs">Likes Given</p>
          </div>
          <div className="card p-4 text-center">
            <FiBookmark size={18} className="text-gold-400 mx-auto mb-1" />
            <p className="font-bold text-lg">34</p>
            <p className="text-dark-400 text-xs">Saved</p>
          </div>
        </div>
      </div>

      {/* Creator Stats (if enabled) */}
      {isCreatorEnabled && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FiTrendingUp size={18} className="text-redd-400" /> Creator Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card p-4 text-center">
              <FiEye size={18} className="text-redd-400 mx-auto mb-1" />
              <p className="font-bold text-lg">125.4K</p>
              <p className="text-dark-400 text-xs">Total Views</p>
            </div>
            <div className="card p-4 text-center">
              <FiUsers size={18} className="text-gold-400 mx-auto mb-1" />
              <p className="font-bold text-lg">8,234</p>
              <p className="text-dark-400 text-xs">Subscribers</p>
            </div>
            <div className="card p-4 text-center">
              <FiDollarSign size={18} className="text-green-400 mx-auto mb-1" />
              <p className="font-bold text-lg">$2,847</p>
              <p className="text-dark-400 text-xs">Revenue</p>
            </div>
            <div className="card p-4 text-center">
              <FiUpload size={18} className="text-blue-400 mx-auto mb-1" />
              <p className="font-bold text-lg">18</p>
              <p className="text-dark-400 text-xs">Uploads</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {['activity', 'favorites', 'friends'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {[
            { action: 'Watched', title: 'Atlanta After Dark Ep. 3', time: '2 hours ago', icon: FiFilm },
            { action: 'Liked', title: 'Studio Sessions', time: '5 hours ago', icon: FiStar },
            { action: 'Party Watch', title: 'The Come Up with Diamond', time: 'Yesterday', icon: FiUsers },
            ...(isCreatorEnabled ? [
              { action: 'Uploaded', title: 'Behind the Scenes: Studio', time: '2 days ago', icon: FiUpload },
              { action: 'Earned', title: '$42.50 from content views', time: '3 days ago', icon: FiDollarSign },
            ] : []),
          ].map((item, i) => (
            <div key={i} className="card flex items-center gap-3">
              <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                <item.icon size={18} className="text-redd-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.action}: {item.title}</p>
                <p className="text-dark-400 text-xs">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-3">
          {['Atlanta After Dark', 'Queens of the South', 'Boss Moves', 'Studio Sessions'].map((title, i) => (
            <div key={i} className="card flex items-center gap-3">
              <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                <FiFilm size={18} className="text-dark-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="space-y-3">
          {['Diamond Jackson', 'Marcus Williams', 'Jasmine Carter', 'Dre Thompson'].map((name, i) => (
            <div key={i} className="card flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-redd-600 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-dark-400 text-xs">Online</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-8 w-full flex items-center justify-center gap-2 py-3 text-dark-400 hover:text-redd-400 transition-colors"
      >
        <FiLogOut size={18} /> Sign Out
      </button>
    </div>
  );
}
