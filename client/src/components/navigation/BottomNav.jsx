import { NavLink } from 'react-router-dom';
import { FiHome, FiCompass, FiBookmark, FiUser, FiSmartphone } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/home', icon: FiHome, label: t('nav.home'), end: true },
    { to: '/home/browse', icon: FiCompass, label: t('nav.browse') },
    { to: '/home/browse?type=vertical-drama', icon: FiSmartphone, label: t('nav.dramas') },
    { to: '/home/library', icon: FiBookmark, label: t('nav.library') },
    { to: '/home/profile', icon: FiUser, label: t('nav.profile') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-t border-dark-700 z-50 safe-area-bottom">
      <div className="flex justify-around py-2 px-2">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive ? 'text-redd-500 scale-105' : 'text-dark-400 hover:text-dark-200'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
