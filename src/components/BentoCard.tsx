import React, { useCallback, useRef } from 'react';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  interactive = false,
  className = '',
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);

        if (
          interactive &&
          window.matchMedia('(pointer: fine)').matches &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          const px = x / rect.width - 0.5;
          const py = y / rect.height - 0.5;
          const rotateY = (px * 4.2).toFixed(2);
          const rotateX = (-py * 4.2).toFixed(2);
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        }
      }
      onMouseMove?.(e);
    },
    [interactive, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (el && interactive) {
        el.style.transform = '';
      }
      onMouseLeave?.(e);
    },
    [interactive, onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={[
        'bento-card rounded-[28px] border',
        'bg-white/90 border-black/[0.06] shadow-apple-light',
        'dark:bg-[#141416]/90 dark:border-white/[0.08] dark:shadow-apple-dark',
        'backdrop-blur-2xl',
        interactive
          ? 'cursor-pointer hover:border-black/[0.12] hover:shadow-apple-light-hover dark:hover:border-white/[0.18]'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};
