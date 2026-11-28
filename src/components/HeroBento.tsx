import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, MessageSquare, QrCode, Zap } from 'lucide-react';
import { Lang, PROFILE, UI_TEXT } from '../data/profile';
import { BentoCard } from './BentoCard';

interface HeroBentoProps {
  lang: Lang;
  onOpenQr: () => void;
  glitchOverdrive?: boolean;
}

export const HeroBento: React.FC<HeroBentoProps> = ({
  lang,
  onOpenQr,
  glitchOverdrive = false,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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

  const handleVisualMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: -(nx * 14), y: -(ny * 14) });
  }, []);

  const handleVisualLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <section id="overview" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Main Editorial Hero Card (7 cols on lg / 8 cols on xl) */}
        <BentoCard className="lg:col-span-7 xl:col-span-8 p-7 sm:p-10 lg:p-11 flex flex-col justify-between min-h-[340px] lg:min-h-[420px]">
          <div>
            {/* Clean identity row with lightweight inline craft tags */}
            <div className="flex items-center gap-4 mb-7 sm:mb-8">
              {PROFILE.avatarUrl ? (
                <img
                  src={PROFILE.avatarUrl}
                  alt={PROFILE.name[lang]}
                  className="w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-[20px] object-cover ring-1 ring-black/10 dark:ring-white/15 shadow-lg shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-[20px] bg-zinc-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
                  {PROFILE.avatarMonogram}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
                    {PROFILE.name[lang]}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/[0.045] dark:bg-white/[0.08] text-zinc-600 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {PROFILE.role[lang]}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  <span className="font-mono">{PROFILE.handle}</span>
                  {PROFILE.skills.length > 0 && (
                    <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
                  )}
                  <span className="hidden sm:inline text-zinc-500 dark:text-zinc-400 truncate">
                    {PROFILE.skills.map((s) => s.label[lang]).join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Editorial Manifesto Quote */}
            <blockquote
              id="manifesto"
              className="relative mt-2 pl-5 py-1 max-w-2xl scroll-mt-28"
            >
              {/* Restrained 2.5px titanium-blue vertical accent line */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[#0071E3] via-[#2997FF]/60 to-transparent dark:from-[#2997FF] dark:via-sky-300/45 dark:to-transparent"
              />
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.82] tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
                {PROFILE.aiManifesto.segments.map((seg, idx) => (
                  <span
                    key={idx}
                    className={
                      seg.highlight
                        ? 'text-[#1D1D1F] dark:text-zinc-100 font-semibold'
                        : undefined
                    }
                  >
                    {seg.text[lang]}
                  </span>
                ))}
              </p>
            </blockquote>
          </div>

          {/* Minimal Action Row */}
          <div className="flex flex-wrap items-center gap-3 mt-7 sm:mt-8">
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

        {/* Right Full-Bleed Spatial "大千世界" Cloud-Sea Visual Card (5 cols on lg / 4 cols on xl) */}
        <BentoCard
          onMouseMove={handleVisualMove}
          onMouseLeave={handleVisualLeave}
          className="lg:col-span-5 xl:col-span-4 relative min-h-[340px] lg:min-h-[420px] p-0 overflow-hidden group"
        >
          {/* Layer 1: Interactive mouse spatial parallax + continuous Ken Burns breathing motion */}
          <div
            style={{
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            }}
            className="absolute inset-0 transition-transform duration-500 ease-out"
          >
            <img
              src={PROFILE.heroVisualUrl}
              alt={PROFILE.role[lang]}
              className="w-full h-full object-cover object-[50%_38%] hero-spatial-breathe brightness-[1.03] contrast-[1.04] saturate-[0.9] dark:brightness-[0.74] dark:contrast-[1.12] dark:saturate-[0.86] transition-[filter] duration-500"
            />
          </div>

          {/* Layer 2: Drifting volumetric cloud-sea mist across the stone archway */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-1/4 top-[38%] bottom-0 hero-mist-layer mix-blend-screen dark:mix-blend-soft-light"
            style={{
              background:
                'radial-gradient(ellipse 65% 48% at 50% 62%, rgba(255, 255, 255, 0.52), rgba(186, 230, 253, 0.22) 48%, transparent 75%)',
            }}
          />

          {/* Layer 3: Subtle Apple sapphire-blue & lavender diagonal optical sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1/2 hero-light-sweep mix-blend-soft-light"
            style={{
              background:
                'linear-gradient(115deg, transparent 28%, rgba(41, 151, 255, 0.34) 46%, rgba(192, 132, 252, 0.24) 54%, transparent 72%)',
            }}
          />

          {/* Adaptive tone-harmony scrim blending stone & sky seamlessly into Light/Dark themes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-sky-200/[0.06] to-indigo-100/15 dark:from-black/80 dark:via-indigo-950/20 dark:to-black/25" />

          {/* Top-right subtle signal telemetry pill (subtle foreground depth shift) */}
          <div
            style={{
              transform: `translate3d(${(parallax.x * -0.35).toFixed(1)}px, ${(parallax.y * -0.35).toFixed(1)}px, 0)`,
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-white/65 dark:border-white/15 text-[#1D1D1F] dark:text-white/90 shadow-sm transition-transform duration-500 ease-out"
          >
            {glitchOverdrive ? (
              <>
                <Zap className="w-3 h-3 text-fuchsia-500 dark:text-fuchsia-400" />
                <span>OVERDRIVE</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SIGNAL 99.8%</span>
              </>
            )}
          </div>

          {/* VisionOS-style floating frosted glass caption & clock (subtle foreground depth shift) */}
          <div
            style={{
              transform: `translate3d(${(parallax.x * -0.25).toFixed(1)}px, ${(parallax.y * -0.25).toFixed(1)}px, 0)`,
            }}
            className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 p-4 rounded-2xl bg-white/75 dark:bg-black/50 backdrop-blur-2xl border border-white/65 dark:border-white/15 text-[#1D1D1F] dark:text-white shadow-[0_8px_28px_rgba(0,0,0,0.09)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-end justify-between gap-4 transition-transform duration-500 ease-out"
          >
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
