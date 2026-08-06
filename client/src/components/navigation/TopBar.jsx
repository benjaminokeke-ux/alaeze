import { Link } from 'react-router-dom';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function TopBar({ isCreator = false }) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-dark-950/90 backdrop-blur-lg border-b border-dark-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to={isCreator ? '/creator' : '/home'} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-redd-600 rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">
            <span className="text-redd-500">Alaeze</span>
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" size={18} />
            <input
              type="text"
              placeholder="Search content, creators..."
              className="input-field pl-10 py-2 text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 text-dark-300 hover:text-white" aria-label="Search">
            <FiSearch size={20} />
          </button>
          <button className="relative p-2 text-dark-300 hover:text-white" aria-label="Notifications">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-redd-500 rounded-full" />
          </button>

          {/* Profile / Switch Portal */}
          <div className="flex items-center gap-2">
            {(user?.creatorEnabled || user?.accountType === 'creator' || user?.accountType === 'both') && (
              <Link
                to={isCreator ? '/home' : '/creator'}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-dark-600 text-dark-300 hover:text-white hover:border-redd-500 transition-colors"
              >
                {isCreator ? t('nav.viewer') : t('nav.studio')}
              </Link>
            )}
            <Link to="/home/profile" className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <FiUser size={16} className="text-dark-300" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
