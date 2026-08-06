import { useState } from 'react';
import { FiBookmark, FiClock, FiHeart, FiDownload } from 'react-icons/fi';
import ContentCard from '../../components/content/ContentCard';

const tabs = [
  { id: 'saved', label: 'Saved', icon: FiBookmark },
  { id: 'history', label: 'History', icon: FiClock },
  { id: 'liked', label: 'Liked', icon: FiHeart },
  { id: 'downloads', label: 'Downloads', icon: FiDownload },
];

export default function Library() {
  const [activeTab, setActiveTab] = useState('saved');

  const demoItems = generateLibraryContent();

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-display font-bold mb-6">My Library</h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === id
                ? 'bg-redd-600 text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {demoItems.map((item) => (
          <ContentCard key={item._id} content={item} />
        ))}
      </div>

      {demoItems.length === 0 && (
        <div className="text-center py-20">
          <FiBookmark size={48} className="text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-300">Nothing here yet</h3>
          <p className="text-dark-500 mt-2">Start saving content to build your library</p>
        </div>
      )}
    </div>
  );
}

function generateLibraryContent() {
  const titles = ['The Come Up', 'Boss Moves', 'Studio Sessions', 'Real Talk', 'Midnight Hustle', 'Crown Heights'];
  const types = ['docuseries', 'movie', 'podcast', 'mini-series', 'reel', 'visual-art'];
  return titles.map((title, i) => ({
    _id: `lib-${i}`,
    title,
    type: types[i],
    thumbnail: null,
    creator: { name: `Creator ${i + 1}` },
    views: Math.floor(Math.random() * 30000),
    duration: Math.floor(Math.random() * 90) + 10,
  }));
}
