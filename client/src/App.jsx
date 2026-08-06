import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Beta Testing
import FeedbackWidget from './components/beta/FeedbackWidget';
import BetaBanner from './components/beta/BetaBanner';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import CreatorLayout from './components/layouts/CreatorLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Subscriber Pages
import Home from './pages/subscriber/Home';
import Browse from './pages/subscriber/Browse';
import ContentPlayer from './pages/subscriber/ContentPlayer';
import Library from './pages/subscriber/Library';
import Social from './pages/subscriber/Social';
import PartyWatch from './pages/subscriber/PartyWatch';
import Profile from './pages/subscriber/Profile';
import Subscription from './pages/subscriber/Subscription';
import Settings from './pages/subscriber/Settings';
import VerticalDramaPlayer from './pages/subscriber/VerticalDramaPlayer';

// Creator Pages
import CreatorDashboard from './pages/creator/Dashboard';
import CreatorUpload from './pages/creator/Upload';
import CreatorAnalytics from './pages/creator/Analytics';
import CreatorContent from './pages/creator/Content';
import CreatorEngagement from './pages/creator/Engagement';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-redd-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return children;
}

function CreatorRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-redd-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  const hasCreatorAccess = user.creatorEnabled || user.accountType === 'creator' || user.accountType === 'both';
  if (!hasCreatorAccess) return <Navigate to="/home/profile" />;

  return children;
}

export default function App() {
  return (
    <>
      <BetaBanner />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Subscriber Routes */}
      <Route path="/home" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="library" element={<Library />} />
        <Route path="social" element={<Social />} />
        <Route path="profile" element={<Profile />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/watch/:contentId" element={<ProtectedRoute><ContentPlayer /></ProtectedRoute>} />
      <Route path="/drama/:seriesId" element={<ProtectedRoute><VerticalDramaPlayer /></ProtectedRoute>} />
      <Route path="/party/:partyId" element={<ProtectedRoute><PartyWatch /></ProtectedRoute>} />

      {/* Creator Routes */}
      <Route path="/creator" element={<CreatorRoute><CreatorLayout /></CreatorRoute>}>
        <Route index element={<CreatorDashboard />} />
        <Route path="upload" element={<CreatorUpload />} />
        <Route path="content" element={<CreatorContent />} />
        <Route path="analytics" element={<CreatorAnalytics />} />
        <Route path="engagement" element={<CreatorEngagement />} />
      </Route>
    </Routes>
    <FeedbackWidget />
    </>
  );
}
