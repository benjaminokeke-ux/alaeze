/**
 * Alaeze User Testing Analytics
 * 
 * Lightweight event tracking for beta testing.
 * Captures user behavior, feature usage, and session data.
 * In production, swap this for a real analytics provider (Mixpanel, Amplitude, PostHog).
 */

const ANALYTICS_ENDPOINT = `${import.meta.env.VITE_API_URL || ''}/api/analytics/events`;
const SESSION_KEY = 'alaeze_session';

let sessionId = null;
let sessionStart = null;
let eventQueue = [];
let flushTimer = null;

export function initSession(userId) {
  sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  sessionStart = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ sessionId, userId, startedAt: sessionStart }));

  // Flush events every 10 seconds
  flushTimer = setInterval(flushEvents, 10000);

  // Track session start
  trackEvent('session_start', { userId });

  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    trackEvent('session_end', { duration: Math.round((Date.now() - sessionStart) / 1000) });
    flushEvents();
  });
}

export function trackEvent(eventName, properties = {}) {
  const event = {
    event: eventName,
    sessionId,
    timestamp: new Date().toISOString(),
    properties: {
      ...properties,
      url: window.location.pathname,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      isMobile: window.innerWidth < 768,
    },
  };
  eventQueue.push(event);

  // Flush immediately for critical events
  if (['session_end', 'feedback_submitted', 'error'].includes(eventName)) {
    flushEvents();
  }
}

export function trackPageView(page) {
  trackEvent('page_view', { page });
}

export function trackFeatureUse(feature, details = {}) {
  trackEvent('feature_use', { feature, ...details });
}

export function trackContentInteraction(action, contentId, contentType) {
  trackEvent('content_interaction', { action, contentId, contentType });
}

export function trackDwellTime(contentId, seconds) {
  trackEvent('dwell_time', { contentId, seconds });
}

async function flushEvents() {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  try {
    const token = localStorage.getItem('alaeze_token');
    await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ events: eventsToSend }),
    });
  } catch {
    // Re-queue on failure
    eventQueue = [...eventsToSend, ...eventQueue];
  }
}

export function endSession() {
  if (flushTimer) clearInterval(flushTimer);
  trackEvent('session_end', { duration: Math.round((Date.now() - sessionStart) / 1000) });
  flushEvents();
}
