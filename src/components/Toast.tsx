import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div
      aria-live="polite"
      className={[
        'fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none',
        message ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95',
      ].join(' ')}
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1D1D1F]/95 dark:bg-white/95 text-white dark:text-[#1D1D1F] shadow-2xl border border-white/10 dark:border-black/10 backdrop-blur-xl text-sm font-medium whitespace-nowrap">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
