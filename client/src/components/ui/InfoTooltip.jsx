import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

export default function InfoTooltip({ text }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <FiInfo
        size={14}
        className="text-dark-500 hover:text-dark-300 cursor-help transition-colors"
        aria-label="More info"
      />
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 text-xs text-dark-200 bg-dark-800 border border-dark-600 rounded-lg shadow-xl z-50 animate-fade-in pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark-800" />
        </span>
      )}
    </span>
  );
}
