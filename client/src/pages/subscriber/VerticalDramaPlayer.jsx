import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark, FiChevronUp, FiChevronDown, FiX, FiLock, FiList, FiPlay } from 'react-icons/fi';

const SWIPE_THRESHOLD = 60;

export default function VerticalDramaPlayer() {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [episodes, setEpisodes] = useState([]);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showEpisodeList, setShowEpisodeList] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  useEffect(() => {
    setEpisodes(generateDemoEpisodes(seriesId));
  }, [seriesId]);

  const goToEpisode = useCallback((index) => {
    if (index < 0 || index >= episodes.length || transitioning) return;
    if (episodes[index].locked) return; // Can't swipe into locked episode
    setTransitioning(true);
    setCurrentEpisode(index);
    setTimeout(() => setTransitioning(false), 300);
  }, [episodes, transitioning]);

  function handleTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  }

  function handleTouchMove(e) {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  }

  function handleTouchEnd() {
    if (Math.abs(touchDeltaY.current) > SWIPE_THRESHOLD) {
      if (touchDeltaY.current < 0) goToEpisode(currentEpisode + 1);
      else goToEpisode(currentEpisode - 1);
    }
    touchDeltaY.current = 0;
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goToEpisode(currentEpisode + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToEpisode(currentEpisode - 1);
      } else if (e.key === 'Escape') {
        navigate(-1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentEpisode, goToEpisode, navigate]);

  if (episodes.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-redd-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const episode = episodes[currentEpisode];
  const isLocked = episode.locked;

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      {/* Desktop: Side Panel — Episode List & Info */}
      <DesktopSidePanel
        episodes={episodes}
        currentEpisode={currentEpisode}
        onSelectEpisode={goToEpisode}
        seriesTitle={episode.seriesTitle}
      />

      {/* Main Player Area */}
      <div
        className="flex-1 relative select-none overflow-hidden flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white md:left-auto md:right-4"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        {/* Episode Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium">
          Ep {currentEpisode + 1} / {episodes.length}
        </div>

        {/* Episode list toggle — mobile only */}
        <button
          onClick={() => setShowEpisodeList(!showEpisodeList)}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white md:hidden"
          aria-label="Episode list"
        >
          <FiList size={18} />
        </button>

        {/* Vertical Video Container — constrained to phone-like dimensions on desktop */}
        <div className={`relative w-full h-full md:w-[360px] md:h-[640px] md:max-h-[85vh] md:rounded-2xl md:overflow-hidden md:border md:border-dark-700 md:shadow-2xl transition-transform duration-300 ${transitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
          {/* Video content area */}
          <div className="w-full h-full bg-gradient-to-b from-dark-900 via-dark-950 to-black flex flex-col items-center justify-center">
            {isLocked ? (
              <div className="text-center px-8">
                <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-dark-600">
                  <FiLock size={28} className="text-gold-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">Episode Locked</h3>
                <p className="text-dark-400 text-sm mb-6">Upgrade to Premium or watch an ad to unlock.</p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button className="btn-gold w-full">Unlock with Premium</button>
                  <button className="btn-secondary w-full">Watch Ad to Unlock</button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Episode {currentEpisode + 1}</p>
                <p className="text-white font-semibold mt-1">{episode.title}</p>
              </div>
            )}
          </div>

          {/* Bottom Overlay — Info + Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-6 z-10">
            <div className="flex items-end gap-3">
              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm line-clamp-1">{episode.seriesTitle}</p>
                <p className="text-white/80 text-xs mt-0.5">Ep. {currentEpisode + 1}: {episode.title}</p>
                <p className="text-white/50 text-[11px] mt-1 line-clamp-2">{episode.description}</p>
                {/* Progress dots */}
                <div className="flex gap-0.5 mt-3 overflow-hidden max-w-[180px]">
                  {episodes.slice(0, 20).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === currentEpisode ? 'w-4 bg-redd-500' : i < currentEpisode ? 'w-1.5 bg-white/60' : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                  {episodes.length > 20 && <span className="text-white/30 text-[9px] ml-1">+{episodes.length - 20}</span>}
                </div>
              </div>

              {/* Action Buttons — vertical stack */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setLiked({ ...liked, [currentEpisode]: !liked[currentEpisode] })}
                  className="flex flex-col items-center gap-0.5"
                  aria-label="Like"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${liked[currentEpisode] ? 'bg-redd-600' : 'bg-white/10'}`}>
                    <FiHeart size={18} className="text-white" fill={liked[currentEpisode] ? 'currentColor' : 'none'} />
                  </div>
                  <span className="text-white text-[9px]">{episode.likes}</span>
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex flex-col items-center gap-0.5"
                  aria-label="Comments"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <FiMessageCircle size={18} className="text-white" />
                  </div>
                  <span className="text-white text-[9px]">{episode.comments}</span>
                </button>

                <button
                  onClick={() => setSaved(!saved)}
                  className="flex flex-col items-center gap-0.5"
                  aria-label="Save"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${saved ? 'bg-gold-500' : 'bg-white/10'}`}>
                    <FiBookmark size={18} className="text-white" fill={saved ? 'currentColor' : 'none'} />
                  </div>
                  <span className="text-white text-[9px]">Save</span>
                </button>

                <button className="flex flex-col items-center gap-0.5" aria-label="Share">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <FiShare2 size={18} className="text-white" />
                  </div>
                  <span className="text-white text-[9px]">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Swipe hints — desktop only */}
          {currentEpisode > 0 && (
            <button onClick={() => goToEpisode(currentEpisode - 1)} className="absolute top-16 left-1/2 -translate-x-1/2 z-20 text-white/20 hover:text-white/50 transition-colors hidden md:block" aria-label="Previous">
              <FiChevronUp size={24} />
            </button>
          )}
          {currentEpisode < episodes.length - 1 && !isLocked && (
            <button onClick={() => goToEpisode(currentEpisode + 1)} className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 text-white/20 hover:text-white/50 transition-colors hidden md:block" aria-label="Next">
              <FiChevronDown size={24} />
            </button>
          )}
        </div>

        {/* Comments Drawer — Mobile */}
        {showComments && (
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-dark-900 rounded-t-2xl z-50 flex flex-col animate-slide-up md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h3 className="font-semibold text-white">Comments ({episode.comments})</h3>
              <button onClick={() => setShowComments(false)} className="text-dark-400"><FiX size={20} /></button>
            </div>
            <CommentsList />
          </div>
        )}

        {/* Episode List Drawer — Mobile */}
        {showEpisodeList && (
          <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-dark-900 rounded-t-2xl z-50 flex flex-col animate-slide-up md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h3 className="font-semibold text-white">{episode.seriesTitle} — Episodes</h3>
              <button onClick={() => setShowEpisodeList(false)} className="text-dark-400"><FiX size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {episodes.map((ep, i) => (
                <button
                  key={i}
                  onClick={() => { if (!ep.locked) { goToEpisode(i); setShowEpisodeList(false); } }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    i === currentEpisode ? 'bg-redd-600/20 border border-redd-600/40' : 'bg-dark-800 hover:bg-dark-700'
                  } ${ep.locked ? 'opacity-50' : ''}`}
                >
                  <span className="text-dark-400 text-xs w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{ep.title}</p>
                  </div>
                  {ep.locked && <FiLock size={14} className="text-gold-400" />}
                  {i === currentEpisode && <span className="text-redd-400 text-xs font-medium">Playing</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Right Panel — Comments */}
      <DesktopCommentsPanel
        episode={episode}
        currentEpisode={currentEpisode}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </div>
  );
}

/* Desktop Side Panel — Episode list and series info */
function DesktopSidePanel({ episodes, currentEpisode, onSelectEpisode, seriesTitle }) {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-dark-900 border-r border-dark-800 overflow-hidden">
      {/* Series Info */}
      <div className="p-5 border-b border-dark-800">
        <h2 className="font-display font-bold text-lg text-white">{seriesTitle}</h2>
        <p className="text-dark-400 text-sm mt-1">{episodes.length} episodes • Vertical Drama</p>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-1.5 flex-1 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-redd-600 to-gold-500 rounded-full transition-all"
              style={{ width: `${((currentEpisode + 1) / episodes.length) * 100}%` }}
            />
          </div>
          <span className="text-dark-400 text-xs">{Math.round(((currentEpisode + 1) / episodes.length) * 100)}%</span>
        </div>
      </div>

      {/* Episode List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-1">
          {episodes.map((ep, i) => (
            <button
              key={i}
              onClick={() => { if (!ep.locked) onSelectEpisode(i); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                i === currentEpisode
                  ? 'bg-redd-600/15 border border-redd-600/30'
                  : 'hover:bg-dark-800'
              } ${ep.locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`text-xs w-5 text-center font-medium ${i === currentEpisode ? 'text-redd-400' : 'text-dark-500'}`}>
                {i + 1}
              </span>
              {i === currentEpisode && !ep.locked && (
                <FiPlay size={12} className="text-redd-400 flex-shrink-0" />
              )}
              <span className={`flex-1 text-sm truncate ${i === currentEpisode ? 'text-white font-medium' : 'text-dark-300'}`}>
                {ep.title}
              </span>
              {ep.locked && <FiLock size={12} className="text-gold-400 flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* Desktop Comments Panel */
function DesktopCommentsPanel({ episode, currentEpisode }) {
  return (
    <aside className="hidden md:flex flex-col w-80 bg-dark-900 border-l border-dark-800">
      <div className="p-4 border-b border-dark-800">
        <h3 className="font-semibold text-white">Comments</h3>
        <p className="text-dark-400 text-xs mt-0.5">Episode {currentEpisode + 1}: {episode.title}</p>
      </div>
      <CommentsList />
      <div className="p-4 border-t border-dark-800">
        <input type="text" placeholder="Add a comment..." className="input-field py-2 text-sm" />
      </div>
    </aside>
  );
}

/* Shared Comments List */
function CommentsList() {
  const comments = [
    { user: 'Diamond', text: 'This episode tho 😭🔥', time: '2m' },
    { user: 'Marcus', text: 'I NEED the next one NOW', time: '5m' },
    { user: 'Jasmine', text: 'The cliffhanger is CRAZY', time: '12m' },
    { user: 'Dre', text: 'Binging this at 3am no regrets 💀', time: '1h' },
    { user: 'Keisha', text: 'Who wrote this it\'s so good', time: '2h' },
    { user: 'Tyler', text: 'Episode 3 is where it gets wild', time: '3h' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {comments.map((c, i) => (
        <div key={i} className="flex gap-3">
          <div className="w-8 h-8 bg-dark-700 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-dark-300">{c.user.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-white text-sm font-medium">{c.user}</span>
              <span className="text-dark-500 text-[10px]">{c.time}</span>
            </div>
            <p className="text-dark-300 text-sm mt-0.5">{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function generateDemoEpisodes(seriesId) {
  const seriesTitle = 'The Betrayal';
  const episodeTitles = [
    'The Wedding', 'Secrets Unveiled', 'The Other Woman', 'Confrontation',
    'Broken Vows', 'The Evidence', 'Family Ties', 'The Truth',
    'Revenge Plot', 'Old Friends', 'Double Cross', 'The Setup',
    'Fall from Grace', 'Rock Bottom', 'New Alliance', 'Power Move',
    'The Trap', 'Exposed', 'Final Showdown', 'Justice',
  ];

  return episodeTitles.map((title, i) => ({
    id: `${seriesId}-ep-${i + 1}`,
    seriesTitle,
    title,
    description: i === 0
      ? 'When Mara discovers a secret at her own wedding reception, her perfect life begins to unravel...'
      : 'The drama intensifies as alliances shift and secrets come to light.',
    duration: Math.floor(Math.random() * 120) + 60,
    likes: Math.floor(Math.random() * 5000) + 500,
    comments: Math.floor(Math.random() * 800) + 100,
    locked: i >= 5,
  }));
}
