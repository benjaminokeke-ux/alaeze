import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiTrendingUp, FiUsers, FiSmartphone } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ContentCard from '../../components/content/ContentCard';
import api from '../../utils/api';

export default function Home() {
  const { user } = useAuth();
  const [featured, setFeatured] = useState(null);
  const [sections, setSections] = useState([]);
  const [verticalDramas, setVerticalDramas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeFeed();
  }, []);

  async function loadHomeFeed() {
    try {
      const { data } = await api.get('/api/content/feed');
      setFeatured(data.featured);
      setSections(data.sections);
      setVerticalDramas(data.verticalDramas || []);
    } catch {
      setFeatured({
        _id: 'demo-1',
        title: 'Atlanta After Dark',
        description: 'An exclusive docuseries exploring Atlanta\'s vibrant nightlife and entertainment scene.',
        type: 'docuseries',
        thumbnail: null,
        creator: { name: 'Karlie' },
      });
      setVerticalDramas(generateVerticalDramas());
      setSections([
        { title: 'Trending Now 🔥', items: generateDemoContent() },
        { title: 'Recommended for You', items: generateDemoContent() },
        { title: 'New Releases', items: generateDemoContent() },
        { title: 'Friends Are Watching', items: generateDemoContent() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-redd-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Featured Hero */}
      {featured && (
        <div className="relative h-[50vh] md:h-[60vh] bg-gradient-to-b from-redd-950/50 to-dark-950">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <span className="badge-redd mb-3">{featured.type}</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">{featured.title}</h1>
            <p className="text-dark-300 max-w-lg mb-4 line-clamp-2">{featured.description}</p>
            <div className="flex gap-3 flex-wrap">
              <Link to={`/watch/${featured._id}`} className="btn-primary flex items-center gap-2">
                <FiPlay size={18} /> Watch Now
              </Link>
              <Link to={`/party/new?content=${featured._id}`} className="btn-secondary flex items-center gap-2">
                <FiUsers size={18} /> Party Watch
              </Link>
              <button className="btn-secondary">+ My List</button>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="px-4 md:px-8 py-6 space-y-8">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Hey {user?.name?.split(' ')[0]} 👋
          </h2>
          <Link to="/home/browse" className="text-redd-400 text-sm font-medium flex items-center gap-1">
            <FiTrendingUp size={14} /> See All
          </Link>
        </div>

        {/* Party Watch Quick Start */}
        <div className="card-glow p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-dark-800 to-dark-900 border-redd-700/30">
          <div className="w-12 h-12 bg-redd-600/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiUsers size={24} className="text-redd-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Start a Party Watch</h3>
            <p className="text-dark-400 text-sm mt-0.5">
              Pick something to watch and invite friends to stream together in real time.
            </p>
          </div>
          <Link to="/party/new" className="btn-primary text-sm py-2 px-4 whitespace-nowrap flex items-center gap-2">
            <FiUsers size={16} /> Start Party
          </Link>
        </div>

        {/* First content section */}
        {sections[0] && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{sections[0].title}</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {sections[0].items.map((item) => (
                <ContentCard key={item._id} content={item} />
              ))}
            </div>
          </div>
        )}

        {/* === VERTICAL DRAMAS — Prominent Featured Section === */}
        {verticalDramas.length > 0 && (
          <div className="relative -mx-4 md:-mx-8 px-4 md:px-8 py-8 bg-gradient-to-r from-redd-950/40 via-dark-900 to-dark-950 border-y border-redd-800/20">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-redd-600 to-gold-500 rounded-xl flex items-center justify-center">
                  <FiSmartphone size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold">Vertical Dramas</h3>
                  <p className="text-dark-400 text-xs">Bite-sized episodes. Swipe to binge.</p>
                </div>
              </div>
              <Link to="/home/browse?type=vertical-drama" className="text-redd-400 text-sm font-medium">
                See All →
              </Link>
            </div>

            {/* Vertical Drama Cards — Portrait orientation, bigger than standard cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {verticalDramas.map((drama) => (
                <Link
                  key={drama._id}
                  to={`/drama/${drama._id}`}
                  className="group flex-shrink-0 w-32 md:w-40"
                >
                  {/* Portrait thumbnail */}
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gradient-to-b from-redd-900/40 via-dark-800 to-dark-900 mb-2 border border-dark-700 group-hover:border-redd-600/50 transition-all">
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:bg-redd-600 transition-colors">
                        <FiPlay size={20} className="text-white ml-0.5" />
                      </div>
                      <span className="text-white/70 text-xs font-medium">{drama.episodes} episodes</span>
                    </div>
                    {/* Top badge */}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-redd-600 to-gold-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      Drama
                    </div>
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                    {/* Views */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white/60 text-[10px]">{formatViews(drama.views)} views</p>
                    </div>
                  </div>
                  {/* Title */}
                  <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-redd-400 transition-colors">
                    {drama.title}
                  </h4>
                  <p className="text-dark-400 text-xs mt-0.5">{drama.creator.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Remaining content sections */}
        {sections.slice(1).map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {section.items.map((item) => (
                <ContentCard key={item._id} content={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatViews(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function generateDemoContent() {
  const types = ['docuseries', 'movie', 'mini-series', 'reel', 'podcast', 'visual-art'];
  const titles = [
    'Queens of the South', 'Midnight Hustle', 'The Come Up', 'Studio Sessions',
    'Real Talk Live', 'Art After Hours', 'Boss Moves', 'Untold Stories',
  ];
  return titles.map((title, i) => ({
    _id: `demo-${Math.random().toString(36).slice(2)}`,
    title,
    type: types[i % types.length],
    thumbnail: null,
    creator: { name: 'Creator ' + (i + 1) },
    views: Math.floor(Math.random() * 50000),
    duration: Math.floor(Math.random() * 120) + 5,
  }));
}

function generateVerticalDramas() {
  const titles = [
    'The Betrayal', 'Stolen Crown', 'Secret Heir', 'Vengeful Heart',
    'Empire Falls', 'The Switch', 'Gold Digger', 'Last Vow',
    'Tangled Lies', 'The Arrangement',
  ];
  return titles.map((title, i) => ({
    _id: `vd-${Math.random().toString(36).slice(2)}`,
    title,
    type: 'vertical-drama',
    thumbnail: null,
    creator: { name: 'Studio ' + (i + 1) },
    views: Math.floor(Math.random() * 200000) + 50000,
    duration: 2,
    episodes: Math.floor(Math.random() * 60) + 20,
  }));
}
