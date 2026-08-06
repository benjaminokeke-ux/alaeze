import { useState } from 'react';
import { FiMessageSquare, FiX, FiSend, FiStar } from 'react-icons/fi';
import { trackEvent } from '../../utils/analytics';
import api from '../../utils/api';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: 'general',
    rating: 0,
    message: '',
    page: '',
  });

  function handleOpen() {
    setIsOpen(true);
    setSubmitted(false);
    setForm({ ...form, page: window.location.pathname });
    trackEvent('feedback_widget_opened');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.message.trim()) return;

    try {
      await api.post('/api/analytics/feedback', {
        ...form,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: new Date().toISOString(),
      });
      trackEvent('feedback_submitted', { type: form.type, rating: form.rating });
    } catch {
      // Still show success — store locally as fallback
      const stored = JSON.parse(localStorage.getItem('alaeze_feedback') || '[]');
      stored.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem('alaeze_feedback', JSON.stringify(stored));
    }

    setSubmitted(true);
    setTimeout(() => { setIsOpen(false); setSubmitted(false); }, 2000);
  }

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 bg-redd-600 hover:bg-redd-700 text-white rounded-full shadow-lg shadow-redd-600/30 flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Send feedback"
        >
          <FiMessageSquare size={20} />
        </button>
      )}

      {/* Feedback panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-80 max-w-[calc(100vw-2rem)] bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-dark-700 bg-dark-800">
            <div>
              <h3 className="font-semibold text-sm text-white">Beta Feedback</h3>
              <p className="text-dark-400 text-xs">Help us improve Alaeze</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-dark-400 hover:text-white">
              <FiX size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-white">Thanks for the feedback!</p>
              <p className="text-dark-400 text-xs mt-1">Your input helps shape Alaeze.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Feedback type */}
              <div className="flex gap-2">
                {[
                  { id: 'general', label: 'General' },
                  { id: 'bug', label: 'Bug' },
                  { id: 'feature', label: 'Feature Idea' },
                  { id: 'ux', label: 'UX Issue' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm({ ...form, type: id })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      form.type === id
                        ? 'bg-redd-600 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Star rating */}
              <div>
                <p className="text-dark-400 text-xs mb-2">How's your experience so far?</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1"
                    >
                      <FiStar
                        size={20}
                        className={star <= form.rating ? 'text-gold-400' : 'text-dark-600'}
                        fill={star <= form.rating ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you think..."
                className="input-field text-sm min-h-[80px] resize-none"
                required
              />

              <button type="submit" className="btn-primary w-full text-sm flex items-center justify-center gap-2">
                <FiSend size={14} /> Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
