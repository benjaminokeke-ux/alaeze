import { useState } from 'react';
import { FiFilm, FiMoreVertical, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CONTENT_TYPE_LABELS } from '../../utils/constants';

export default function CreatorContent() {
  const [filter, setFilter] = useState('all');

  const content = [
    { id: '1', title: 'Atlanta After Dark Ep. 5', type: 'docuseries', status: 'published', views: '12.3K', date: '2024-01-15' },
    { id: '2', title: 'Behind the Scenes: Studio', type: 'reel', status: 'published', views: '8.1K', date: '2024-01-12' },
    { id: '3', title: 'Live Q&A Replay', type: 'live-stream', status: 'published', views: '5.7K', date: '2024-01-10' },
    { id: '4', title: 'New Series Teaser', type: 'mini-series', status: 'scheduled', views: '0', date: '2024-01-20' },
    { id: '5', title: 'Studio Sessions Ep. 3', type: 'podcast', status: 'published', views: '4.9K', date: '2024-01-08' },
    { id: '6', title: 'Art Collection: Midnight', type: 'visual-art', status: 'draft', views: '0', date: '2024-01-18' },
  ];

  const filtered = filter === 'all' ? content : content.filter((c) => c.status === filter);

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">My Content</h1>
          <p className="text-dark-400 mt-1">{content.length} items total</p>
        </div>
        <Link to="/creator/upload" className="btn-primary mt-4 md:mt-0 text-center">
          + Upload New
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'published', 'scheduled', 'draft'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              filter === f ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="card flex items-center gap-4">
            <div className="w-16 h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiFilm size={20} className="text-dark-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-dark-400 text-xs">{CONTENT_TYPE_LABELS[item.type]}</span>
                <span className="text-dark-600">•</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'scheduled' ? 'bg-gold-500/20 text-gold-400' :
                  'bg-dark-600/20 text-dark-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm">{item.views} views</p>
              <p className="text-dark-400 text-xs">{item.date}</p>
            </div>
            <div className="flex gap-1">
              <button className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700" aria-label="View">
                <FiEye size={16} />
              </button>
              <button className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700" aria-label="Edit">
                <FiEdit2 size={16} />
              </button>
              <button className="p-2 text-dark-400 hover:text-redd-400 rounded-lg hover:bg-dark-700" aria-label="Delete">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
