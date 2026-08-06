import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { CONTENT_TYPES, CONTENT_TYPE_LABELS } from '../../utils/constants';
import ContentCard from '../../components/content/ContentCard';

const allTypes = ['all', ...Object.values(CONTENT_TYPES)];

export default function Browse() {
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Demo content for browsing
  const demoContent = generateBrowseContent();
  const filtered = activeType === 'all'
    ? demoContent
    : demoContent.filter((c) => c.type === activeType);

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search content, creators, genres..."
          className="input-field pl-11"
        />
      </div>

      {/* Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-6">
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeType === type
                ? 'bg-redd-600 text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            {type === 'all' ? 'All' : CONTENT_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <ContentCard key={item._id} content={item} />
        ))}
      </div>
    </div>
  );
}

function generateBrowseContent() {
  const types = Object.values(CONTENT_TYPES);
  const titles = [
    'Atlanta After Dark', 'Queens of the South', 'Midnight Hustle', 'The Come Up',
    'Studio Sessions', 'Real Talk Live', 'Art After Hours', 'Boss Moves',
    'Untold Stories', 'The Glow Up', 'Behind the Beat', 'City Lights',
    'Hustle & Heart', 'The Takeover', 'Vibe Check', 'No Filter',
    'Crown Heights', 'The Blueprint', 'After Party', 'Main Stage',
    'The Betrayal', 'Stolen Crown', 'Secret Heir', 'Vengeful Heart',
  ];
  return titles.map((title, i) => ({
    _id: `browse-${i}`,
    title,
    type: types[i % types.length],
    thumbnail: null,
    creator: { name: `Creator ${(i % 8) + 1}` },
    views: Math.floor(Math.random() * 100000),
    duration: types[i % types.length] === 'vertical-drama' ? 2 : Math.floor(Math.random() * 180) + 3,
  }));
}
