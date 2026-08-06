import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiMessageCircle, FiSend, FiMic, FiMicOff, FiPlay, FiPause } from 'react-icons/fi';

export default function PartyWatch() {
  const { partyId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Demo participants
    setParticipants([
      { id: '1', name: 'You', isHost: true },
      { id: '2', name: 'Diamond' },
      { id: '3', name: 'Marcus' },
    ]);
    setMessages([
      { id: '1', user: 'Diamond', text: 'Ready to watch! 🍿', time: '8:00 PM' },
      { id: '2', user: 'Marcus', text: 'Let\'s gooo', time: '8:01 PM' },
    ]);
  }, [partyId]);

  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), user: 'You', text: newMessage, time: 'Now' }]);
    setNewMessage('');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-redd-600 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform"
            >
              {isPlaying ? <FiPause size={24} className="text-white" /> : <FiPlay size={24} className="text-white ml-1" />}
            </button>
            <p className="text-dark-400 text-sm mt-3">Party Watch - Synced Playback</p>
          </div>

          {/* Participant Avatars */}
          <div className="absolute top-4 right-4 flex -space-x-2">
            {participants.map((p) => (
              <div
                key={p.id}
                className="w-8 h-8 bg-gradient-to-br from-redd-600 to-gold-500 rounded-full border-2 border-dark-900 flex items-center justify-center"
                title={p.name}
              >
                <span className="text-white text-xs font-bold">{p.name.charAt(0)}</span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-full ${isMuted ? 'bg-redd-600' : 'bg-dark-800/80'} text-white`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FiMicOff size={18} /> : <FiMic size={18} />}
            </button>
          </div>
        </div>

        {/* Party Info */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Atlanta After Dark - Ep 1</h2>
              <p className="text-dark-400 text-sm flex items-center gap-1">
                <FiUsers size={14} /> {participants.length} watching together
              </p>
            </div>
            <button className="btn-primary text-sm py-2 px-4">Invite Friends</button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full md:w-80 flex flex-col border-l border-dark-700 bg-dark-900 h-[40vh] md:h-screen">
        <div className="p-4 border-b border-dark-700">
          <h3 className="font-semibold flex items-center gap-2">
            <FiMessageCircle size={18} /> Party Chat
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`${msg.user === 'You' ? 'text-right' : ''}`}>
              <div className={`inline-block max-w-[80%] px-3 py-2 rounded-lg ${
                msg.user === 'You' ? 'bg-redd-600 text-white' : 'bg-dark-800 text-dark-200'
              }`}>
                {msg.user !== 'You' && (
                  <p className="text-xs font-medium text-redd-400 mb-1">{msg.user}</p>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-dark-500 text-[10px] mt-1">{msg.time}</p>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-dark-700 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="input-field flex-1 py-2 text-sm"
          />
          <button type="submit" className="btn-primary px-3 py-2" aria-label="Send">
            <FiSend size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
