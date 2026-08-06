import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShare2, FiBookmark, FiUsers, FiMessageCircle, FiSend } from 'react-icons/fi';
import api from '../../utils/api';

export default function ContentPlayer() {
  const { contentId } = useParams();
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadContent();
  }, [contentId]);

  async function loadContent() {
    try {
      const { data } = await api.get(`/api/content/${contentId}`);
      setContent(data.content);
      setComments(data.comments || []);
    } catch {
      // Demo content
      setContent({
        _id: contentId,
        title: 'Atlanta After Dark - Episode 1',
        description: 'Dive into the vibrant nightlife of Atlanta with exclusive access to the hottest venues, artists, and cultural moments that make the city pulse after sunset.',
        type: 'docuseries',
        creator: { name: 'Karlie', followers: 125000 },
        views: 45200,
        likes: 3400,
        duration: 42,
        uploadedAt: new Date().toISOString(),
      });
      setComments([
        { _id: '1', user: { name: 'Diamond' }, text: 'This is fire 🔥🔥🔥', createdAt: new Date() },
        { _id: '2', user: { name: 'Marcus' }, text: 'ATL represent!', createdAt: new Date() },
        { _id: '3', user: { name: 'Jasmine' }, text: 'Need more episodes ASAP', createdAt: new Date() },
      ]);
    }
  }

  function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      { _id: Date.now().toString(), user: { name: 'You' }, text: newComment, createdAt: new Date() },
      ...comments,
    ]);
    setNewComment('');
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-redd-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Video Player Area */}
      <div className="relative aspect-video md:aspect-[21/9] bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-redd-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-dark-400 text-sm">Video Player</p>
        </div>
      </div>

      {/* Content Info */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Info */}
          <div className="flex-1">
            <span className="badge-redd mb-2">{content.type}</span>
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">{content.title}</h1>
            <p className="text-dark-400 mb-4">{content.description}</p>

            {/* Creator Info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-redd-600/20 rounded-full flex items-center justify-center">
                <span className="text-redd-400 font-bold text-sm">
                  {content.creator.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{content.creator.name}</p>
                <p className="text-dark-400 text-sm">
                  {content.creator.followers?.toLocaleString()} followers
                </p>
              </div>
              <button className="ml-auto btn-primary text-sm py-2 px-4">Follow</button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap mb-8">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  liked ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-300 hover:text-white'
                }`}
              >
                <FiHeart size={18} fill={liked ? 'currentColor' : 'none'} />
                {(content.likes + (liked ? 1 : 0)).toLocaleString()}
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  saved ? 'bg-gold-600 text-dark-900' : 'bg-dark-800 text-dark-300 hover:text-white'
                }`}
              >
                <FiBookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 text-dark-300 hover:text-white">
                <FiShare2 size={18} /> Share
              </button>
              <Link
                to={`/party/new?content=${contentId}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 text-dark-300 hover:text-redd-400"
              >
                <FiUsers size={18} /> Party Watch
              </Link>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FiMessageCircle size={18} />
                Comments ({comments.length})
              </h3>

              <form onSubmit={handleComment} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary px-4" aria-label="Send comment">
                  <FiSend size={18} />
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-3">
                    <div className="w-8 h-8 bg-dark-700 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-dark-300">
                        {comment.user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium text-dark-200">{comment.user.name}</span>{' '}
                        <span className="text-dark-400">{comment.text}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
