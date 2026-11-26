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
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      }
      onMouseMove?.(e);
    },
    [onMouseMove]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={[
        'bento-card rounded-[28px] border',
        'bg-white/90 border-black/[0.06] shadow-apple-light',
        'dark:bg-[#141416]/90 dark:border-white/[0.08] dark:shadow-apple-dark',
        'backdrop-blur-2xl',
        interactive
          ? 'cursor-pointer hover:-translate-y-0.5 hover:border-black/[0.12] hover:shadow-apple-light-hover dark:hover:border-white/[0.18]'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};
