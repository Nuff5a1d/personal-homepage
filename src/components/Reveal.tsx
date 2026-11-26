import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${delayMs}ms` : '0ms',
      }}
      className={[
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};
