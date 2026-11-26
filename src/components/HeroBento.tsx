import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MessageSquare, QrCode } from 'lucide-react';
import { Lang, PROFILE, UI_TEXT } from '../data/profile';
import { BentoCard } from './BentoCard';

interface HeroBentoProps {
  lang: Lang;
  onOpenQr: () => void;
}

export const HeroBento: React.FC<HeroBentoProps> = ({ lang, onOpenQr }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString(lang === 'zh' ? 'zh-CN' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <section id="overview" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Main Editorial Hero Card (7 cols on lg / 8 cols on xl) */}
        <BentoCard className="lg:col-span-7 xl:col-span-8 p-7 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] lg:min-h-[460px]">
          <div>
            {/* Clean identity row */}
            <div className="flex items-center gap-4 mb-8">
              {PROFILE.avatarUrl ? (
                <img
                  src={PROFILE.avatarUrl}
                  alt={PROFILE.name[lang]}
                  className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[22px] object-cover ring-1 ring-black/10 dark:ring-white/15 shadow-lg shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-[22px] bg-zinc-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
                  {PROFILE.avatarMonogram}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
                    {PROFILE.name[lang]}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/[0.045] dark:bg-white/[0.08] text-zinc-600 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {PROFILE.role[lang]}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500 mt-1">
                  {PROFILE.handle}
                </p>
              </div>
            </div>

            {/* Keynote Display Headline */}
            <h1 className="text-[28px] sm:text-4xl lg:text-[42px] xl:text-[50px] font-semibold tracking-[-0.02em] leading-[1.36] py-1.5 titanium-text mb-4 text-balance">
              {PROFILE.heroHeadline[lang]}
            </h1>

            <p className="text-[15px] sm:text-[17px] leading-[1.75] text-zinc-600 dark:text-zinc-400 max-w-2xl">
              {PROFILE.heroDescription[lang]}
            </p>
          </div>

          {/* Minimal Action Row */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#1D1D1F] text-white dark:bg-white dark:text-[#1D1D1F] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              <span>{UI_TEXT.hero.ctaProjects[lang]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-black/[0.05] dark:bg-white/[0.09] text-[#1D1D1F] dark:text-white hover:bg-black/[0.09] dark:hover:bg-white/[0.15] active:scale-[0.98] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{UI_TEXT.hero.ctaContact[lang]}</span>
            </a>
            <button
              type="button"
              onClick={onOpenQr}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-black/[0.035] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.11] transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>{lang === 'zh' ? '微信扫码' : 'WeChat QR'}</span>
            </button>
          </div>
        </BentoCard>

        {/* Right Full-Bleed Apple Titanium & Glass Visual Card (5 cols on lg / 4 cols on xl) */}
        <BentoCard className="lg:col-span-5 xl:col-span-4 relative min-h-[380px] lg:min-h-[460px] p-0 overflow-hidden group">
          <img
            src={PROFILE.heroVisualUrl}
            alt={PROFILE.role[lang]}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] dark:brightness-[0.78] dark:contrast-[1.08]"
          />
          {/* Subtle adaptive light/dark editorial scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/10 dark:from-black/70 dark:via-black/15 dark:to-transparent" />

          {/* VisionOS-style floating frosted glass caption & clock */}
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 p-4 rounded-2xl bg-white/70 dark:bg-black/45 backdrop-blur-2xl border border-white/60 dark:border-white/15 text-[#1D1D1F] dark:text-white shadow-[0_8px_28px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.45)] flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs text-zinc-600 dark:text-white/70 truncate">
                {PROFILE.location[lang]}
              </div>
              <div className="text-sm sm:text-[15px] font-medium mt-0.5 leading-snug">
                {PROFILE.philosophy[lang]}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-white/60">
                GMT+8
              </div>
              <div className="text-base sm:text-lg font-mono font-semibold tabular-nums tracking-tight">
                {timeStr || '22:00:00'}
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
