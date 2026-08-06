import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiBell, FiMonitor, FiGlobe, FiShield, FiTrash2, FiChevronRight, FiCheck } from 'react-icons/fi';

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const [preferences, setPreferences] = useState({
    notifications: user?.preferences?.notifications ?? true,
    emailDigest: user?.preferences?.emailDigest ?? true,
    friendRequests: user?.preferences?.friendRequests ?? true,
    partyInvites: user?.preferences?.partyInvites ?? true,
    creatorUpdates: user?.preferences?.creatorUpdates ?? true,
    autoplay: user?.preferences?.autoplay ?? true,
    theme: user?.preferences?.theme || 'dark',
    language: user?.preferences?.language || 'en',
    videoQuality: user?.preferences?.videoQuality || 'auto',
    privateProfile: user?.preferences?.privateProfile ?? false,
    showWatchHistory: user?.preferences?.showWatchHistory ?? true,
    allowPartyInvites: user?.preferences?.allowPartyInvites ?? true,
  });

  const [activeSection, setActiveSection] = useState('account');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name || '');

  async function savePreferences(updated) {
    setSaving(true);
    setSaved(false);
    const newPrefs = { ...preferences, ...updated };
    setPreferences(newPrefs);
    try {
      await updateProfile({ preferences: newPrefs });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // revert on failure
    } finally {
      setSaving(false);
    }
  }

  async function saveName() {
    if (!nameValue.trim()) return;
    await updateProfile({ name: nameValue.trim() });
    setEditingName(false);
  }

  const sections = [
    { id: 'account', label: 'Account', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'playback', label: 'Playback', icon: FiMonitor },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
    { id: 'language', label: 'Language', icon: FiGlobe },
  ];

  return (
    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:w-48 flex-shrink-0">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === id
                  ? 'bg-redd-600/10 text-redd-400 border border-redd-600/30'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Save indicator */}
          {saved && (
            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
              <FiCheck size={16} /> Settings saved
            </div>
          )}

          {/* Account Section */}
          {activeSection === 'account' && (
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-dark-400">Display Name</p>
                      {editingName ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            className="input-field py-1.5 text-sm w-48"
                            autoFocus
                          />
                          <button onClick={saveName} className="text-redd-400 text-sm font-medium">Save</button>
                          <button onClick={() => setEditingName(false)} className="text-dark-400 text-sm">Cancel</button>
                        </div>
                      ) : (
                        <p className="font-medium">{user?.name}</p>
                      )}
                    </div>
                    {!editingName && (
                      <button onClick={() => setEditingName(true)} className="text-redd-400 text-sm font-medium">Edit</button>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-dark-700 pt-4">
                    <div>
                      <p className="text-sm text-dark-400">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-dark-700 pt-4">
                    <div>
                      <p className="text-sm text-dark-400">Account Type</p>
                      <p className="font-medium capitalize">{user?.accountType || 'Both'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-semibold mb-4">Password</h3>
                <p className="text-dark-400 text-sm mb-3">Change your password to keep your account secure.</p>
                <button className="btn-secondary text-sm">Change Password</button>
              </div>

              <div className="card p-5 border-redd-800/30">
                <h3 className="font-semibold mb-2 text-redd-400">Danger Zone</h3>
                <p className="text-dark-400 text-sm mb-4">Permanently delete your account and all associated data.</p>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-redd-600/10 text-redd-400 border border-redd-600/30 text-sm font-medium hover:bg-redd-600/20 transition-colors">
                  <FiTrash2 size={14} /> Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="card p-5 space-y-5">
              <h3 className="font-semibold">Notification Preferences</h3>
              <ToggleRow
                label="Push Notifications"
                description="Get notified about new content and activity"
                checked={preferences.notifications}
                onChange={(v) => savePreferences({ notifications: v })}
              />
              <ToggleRow
                label="Email Digest"
                description="Weekly summary of what's new on Alaeze"
                checked={preferences.emailDigest}
                onChange={(v) => savePreferences({ emailDigest: v })}
              />
              <ToggleRow
                label="Friend Requests"
                description="Notify when someone sends a friend request"
                checked={preferences.friendRequests}
                onChange={(v) => savePreferences({ friendRequests: v })}
              />
              <ToggleRow
                label="Party Invites"
                description="Notify when friends invite you to watch together"
                checked={preferences.partyInvites}
                onChange={(v) => savePreferences({ partyInvites: v })}
              />
              <ToggleRow
                label="Creator Updates"
                description="Notify when creators you follow upload new content"
                checked={preferences.creatorUpdates}
                onChange={(v) => savePreferences({ creatorUpdates: v })}
              />
            </div>
          )}

          {/* Playback Section */}
          {activeSection === 'playback' && (
            <div className="card p-5 space-y-5">
              <h3 className="font-semibold">Playback Settings</h3>
              <ToggleRow
                label="Autoplay"
                description="Automatically play the next episode or recommended content"
                checked={preferences.autoplay}
                onChange={(v) => savePreferences({ autoplay: v })}
              />
              <div className="border-t border-dark-700 pt-4">
                <p className="font-medium text-sm mb-1">Video Quality</p>
                <p className="text-dark-400 text-xs mb-3">Higher quality uses more data</p>
                <div className="flex gap-2">
                  {['auto', '720p', '1080p', '4k'].map((q) => (
                    <button
                      key={q}
                      onClick={() => savePreferences({ videoQuality: q })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium uppercase transition-colors ${
                        preferences.videoQuality === q
                          ? 'bg-redd-600 text-white'
                          : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-medium text-sm mb-1">Theme</p>
                <p className="text-dark-400 text-xs mb-3">Choose your visual preference</p>
                <div className="flex gap-2">
                  {['dark', 'midnight', 'amoled'].map((t) => (
                    <button
                      key={t}
                      onClick={() => savePreferences({ theme: t })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        preferences.theme === t
                          ? 'bg-redd-600 text-white'
                          : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <div className="card p-5 space-y-5">
              <h3 className="font-semibold">Privacy & Safety</h3>
              <ToggleRow
                label="Private Profile"
                description="Only friends can see your profile details and activity"
                checked={preferences.privateProfile}
                onChange={(v) => savePreferences({ privateProfile: v })}
              />
              <ToggleRow
                label="Show Watch History"
                description="Let friends see what you've been watching"
                checked={preferences.showWatchHistory}
                onChange={(v) => savePreferences({ showWatchHistory: v })}
              />
              <ToggleRow
                label="Allow Party Invites"
                description="Let anyone (not just friends) invite you to Party Watch"
                checked={preferences.allowPartyInvites}
                onChange={(v) => savePreferences({ allowPartyInvites: v })}
              />
              <div className="border-t border-dark-700 pt-4">
                <p className="font-medium text-sm mb-1">Blocked Users</p>
                <p className="text-dark-400 text-xs mb-3">Manage users you've blocked</p>
                <button className="btn-secondary text-sm">Manage Blocked Users</button>
              </div>
            </div>
          )}

          {/* Language Section */}
          {activeSection === 'language' && (
            <div className="card p-5 space-y-5">
              <h3 className="font-semibold">Language & Region</h3>
              <div>
                <p className="font-medium text-sm mb-1">Display Language</p>
                <p className="text-dark-400 text-xs mb-3">Choose the language for the interface</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                    { code: 'fr', label: 'Français' },
                    { code: 'pt', label: 'Português' },
                    { code: 'ig', label: 'Igbo' },
                    { code: 'yo', label: 'Yorùbá' },
                    { code: 'zu', label: 'isiZulu' },
                    { code: 'sw', label: 'Kiswahili' },
                    { code: 'de', label: 'Deutsch' },
                    { code: 'ja', label: '日本語' },
                  ].map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { i18n.changeLanguage(code); localStorage.setItem('alaeze_language', code); savePreferences({ language: code }); }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                        preferences.language === code
                          ? 'bg-redd-600 text-white'
                          : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between border-t border-dark-700 pt-4 first:border-0 first:pt-0">
      <div className="flex-1 mr-4">
        <p className="font-medium text-sm">{label}</p>
        {description && <p className="text-dark-400 text-xs mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-redd-600' : 'bg-dark-600'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
