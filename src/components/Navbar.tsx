import React, { useEffect, useState } from 'react';
import { Command, Languages, Moon, Sun, Zap } from 'lucide-react';
import { Lang, PROFILE, UI_TEXT } from '../data/profile';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  glitchOverdrive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenPalette,
  glitchOverdrive,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('#overview');

  const navItems = [
    { href: '#overview', label: UI_TEXT.nav.overview[lang] },
    { href: '#projects', label: UI_TEXT.nav.projects[lang] },
    { href: '#notes', label: UI_TEXT.nav.notes[lang] },
    { href: '#contact', label: UI_TEXT.nav.contact[lang] },
  ];

  useEffect(() => {
    let rafId = 0;
    const sectionIds = ['overview', 'projects', 'notes', 'contact'];

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)));

        const scrollPivot = window.scrollY + 180;
        let current = '#overview';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPivot) {
            current = `#${id}`;
          }
        }
        setActiveSection(current);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Ultra-thin scroll progress ribbon */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none bg-transparent"
      >
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-[#0071E3] via-[#2997FF] to-violet-500 transition-[width] duration-75 ease-out"
        />
      </div>

      <header className="sticky top-4 z-40 px-4 sm:px-8 lg:px-12 xl:px-16 mb-6">
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-white/75 dark:bg-[#161618]/75 border border-black/[0.07] dark:border-white/[0.1] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
          {/* Brand mark with real avatar — shrink-0 & whitespace-nowrap prevents orphan line wrap */}
          <a
            href="#overview"
            className="flex items-center gap-2.5 pl-0.5 pr-1.5 py-0.5 rounded-full hover:opacity-85 transition-opacity shrink-0"
          >
            {PROFILE.avatarUrl ? (
              <img
                src={PROFILE.avatarUrl}
                alt={PROFILE.name[lang]}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/15 shrink-0"
              />
            ) : (
              <span className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-[11px] font-bold shrink-0">
                {PROFILE.avatarMonogram}
              </span>
            )}
            <span className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-white hidden md:inline whitespace-nowrap">
              {PROFILE.name[lang]}
            </span>
            {glitchOverdrive && (
              <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-500/25 whitespace-nowrap">
                <Zap className="w-2.5 h-2.5" />
                OVERDRIVE
              </span>
            )}
          </a>

          {/* Center anchor links with scroll spy */}
          <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar min-w-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={[
                    'px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-black/[0.06] dark:bg-white/[0.11] text-[#1D1D1F] dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.07]',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right controls: Command Palette + Bilingual + Theme */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-700 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.07] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-colors"
              title={lang === 'zh' ? '打开快捷命令面板 (⌘K)' : 'Command Palette (⌘K)'}
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">K</span>
            </button>
            <button
              type="button"
              onClick={onToggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.07] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-colors"
              title={lang === 'zh' ? 'Switch to English' : '切换中文'}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.07] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : '切换深色模式'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
