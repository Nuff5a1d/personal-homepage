import React from 'react';
import { Languages, Moon, Sun } from 'lucide-react';
import { Lang, PROFILE, UI_TEXT } from '../data/profile';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
}) => {
  const navItems = [
    { href: '#overview', label: UI_TEXT.nav.overview[lang] },
    { href: '#projects', label: UI_TEXT.nav.projects[lang] },
    { href: '#notes', label: UI_TEXT.nav.notes[lang] },
    { href: '#contact', label: UI_TEXT.nav.contact[lang] },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-8 lg:px-12 xl:px-16 mb-6">
      <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between gap-3 px-3 sm:px-4 py-2 rounded-full bg-white/75 dark:bg-[#161618]/75 border border-black/[0.07] dark:border-white/[0.1] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
        {/* Brand mark with real avatar */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 pl-0.5 pr-2 py-0.5 rounded-full hover:opacity-85 transition-opacity"
        >
          {PROFILE.avatarUrl ? (
            <img
              src={PROFILE.avatarUrl}
              alt={PROFILE.name[lang]}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/15"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-[11px] font-bold">
              {PROFILE.avatarMonogram}
            </span>
          )}
          <span className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-white hidden sm:inline">
            {PROFILE.name[lang]}
          </span>
        </a>

        {/* Center anchor links */}
        <nav className="flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right controls: Bilingual + Theme */}
        <div className="flex items-center gap-1.5 shrink-0">
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
  );
};
