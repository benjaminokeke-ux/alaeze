import { useState } from 'react';
import { FiCheck, FiStar } from 'react-icons/fi';
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_DETAILS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Subscription() {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState(user?.subscription || SUBSCRIPTION_TIERS.FREE);

  return (
    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Choose Your Plan</h1>
        <p className="text-dark-400">Unlock the full Alaeze experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(SUBSCRIPTION_DETAILS).map(([tier, details]) => {
          const isActive = user?.subscription === tier;
          const isSelected = selectedTier === tier;
          const isVIP = tier === SUBSCRIPTION_TIERS.VIP;

          return (
            <div
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`relative card p-6 cursor-pointer transition-all ${
                isSelected ? 'border-redd-500 shadow-lg shadow-redd-600/20' : ''
              } ${isVIP ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {isVIP && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              {isActive && (
                <div className="absolute top-3 right-3 badge-redd">Current</div>
              )}

              <div className="text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  isVIP ? 'bg-gold-500/20' : 'bg-redd-600/10'
                }`}>
                  <FiStar size={24} className={isVIP ? 'text-gold-400' : 'text-redd-400'} />
                </div>
                <h3 className="text-xl font-display font-bold">{details.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    {details.price === 0 ? 'Free' : `$${details.price}`}
                  </span>
                  {details.price > 0 && <span className="text-dark-400 text-sm">/month</span>}
                </div>
                <p className="text-dark-400 text-sm mt-2">{details.description}</p>
              </div>

              <ul className="space-y-3">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <FiCheck size={16} className="text-redd-400 mt-0.5 flex-shrink-0" />
                    <span className="text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  isActive
                    ? 'bg-dark-700 text-dark-400 cursor-default'
                    : isVIP
                    ? 'btn-gold'
                    : 'btn-primary'
                }`}
                disabled={isActive}
              >
                {isActive ? 'Current Plan' : tier === SUBSCRIPTION_TIERS.FREE ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
