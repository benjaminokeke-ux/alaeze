import { Link } from 'react-router-dom';
import { FiPlay, FiClock } from 'react-icons/fi';
import { CONTENT_TYPE_LABELS } from '../../utils/constants';

export default function ContentCard({ content, compact = false }) {
  const { _id, title, type, thumbnail, creator, views, duration } = content;

  const linkTo = type === 'vertical-drama' ? `/drama/${_id}` : `/watch/${_id}`;

  function formatViews(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  function formatDuration(mins) {
    if (!mins) return '';
    if (mins >= 60) return Math.floor(mins / 60) + 'h ' + (mins % 60) + 'm';
    return mins + 'm';
  }

  return (
    <Link
      to={linkTo}
      className={`group flex-shrink-0 ${compact ? 'w-36' : 'w-44 md:w-56'}`}
    >
      {/* Thumbnail */}
      <div className={`relative ${type === 'vertical-drama' ? 'aspect-[9/16]' : 'aspect-[16/9]'} rounded-lg overflow-hidden bg-dark-800 mb-2`}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-redd-900/30 to-dark-800 flex items-center justify-center">
            <FiPlay size={24} className="text-dark-500" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 bg-redd-600 rounded-full flex items-center justify-center">
            <FiPlay size={18} className="text-white ml-0.5" />
          </div>
        </div>

        {/* Duration / Episode badge */}
        {type === 'vertical-drama' && content.episodes ? (
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
            {content.episodes} eps
          </div>
        ) : duration ? (
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
            <FiClock size={10} />
            {formatDuration(duration)}
          </div>
        ) : null}

        {/* Type badge */}
        <div className="absolute top-1.5 left-1.5 bg-redd-600/90 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
          {CONTENT_TYPE_LABELS[type] || type}
        </div>
      </div>

      {/* Info */}
      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-redd-400 transition-colors">
        {title}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-dark-400 text-xs">{creator?.name}</span>
        {views > 0 && (
          <>
            <span className="text-dark-600 text-xs">•</span>
            <span className="text-dark-400 text-xs">{formatViews(views)} views</span>
          </>
        )}
      </div>
    </Link>
  );
}
