import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function BetaBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('alaeze_beta_banner_dismissed') === 'true'
  );

  if (dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem('alaeze_beta_banner_dismissed', 'true');
  }

  return (
    <div className="bg-gradient-to-r from-redd-600 to-gold-600 text-white text-center py-2 px-4 text-xs font-medium relative">
      <span>🧪 You're testing the Alaeze beta — things may break! Use the </span>
      <span className="font-bold">feedback button</span>
      <span> (bottom right) to share your thoughts.</span>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        aria-label="Dismiss"
      >
        <FiX size={14} />
      </button>
    </div>
  );
}
