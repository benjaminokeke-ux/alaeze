import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiUpload, FiFilm, FiBarChart2, FiUsers } from 'react-icons/fi';
import TopBar from '../navigation/TopBar';

const creatorNav = [
  { to: '/creator', icon: FiHome, label: 'Dashboard', end: true },
  { to: '/creator/upload', icon: FiUpload, label: 'Upload' },
  { to: '/creator/content', icon: FiFilm, label: 'Content' },
  { to: '/creator/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/creator/engagement', icon: FiUsers, label: 'Engagement' },
];

export default function CreatorLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar isCreator />
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-dark-900 border-r border-dark-700 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-display font-bold gradient-text">Creator Studio</h2>
            <p className="text-dark-400 text-sm mt-1">Manage your content</p>
          </div>
          <nav className="space-y-1">
            {creatorNav.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-redd-600/10 text-redd-400 border border-redd-600/30'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav for Creator */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-t border-dark-700 z-50">
        <div className="flex justify-around py-2">
          {creatorNav.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-redd-500' : 'text-dark-400'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
