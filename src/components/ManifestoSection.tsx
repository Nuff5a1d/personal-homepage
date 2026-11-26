import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Copy, RotateCcw, Sparkles } from 'lucide-react';
import { Lang, PROFILE } from '../data/profile';
import { BentoCard } from './BentoCard';
import { Reveal } from './Reveal';

interface ManifestoSectionProps {
  lang: Lang;
  onCopy: (text: string, feedback: string) => void;
}

const SCRAMBLE_CHARS = '01█▓▒░/\\<>_#@*+~';

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({
  lang,
  onCopy,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0.35);
  const [decoding, setDecoding] = useState(false);
  const [eyebrowDisplay, setEyebrowDisplay] = useState(
    PROFILE.aiManifesto.eyebrow[lang]
  );

  // Sync eyebrow when language changes
  useEffect(() => {
    setEyebrowDisplay(PROFILE.aiManifesto.eyebrow[lang]);
  }, [lang]);

  // Apple Keynote scroll-driven progressive illumination
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let rafId = 0;
    const updateProgress = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Starts illuminating when entering bottom 92% of viewport, completes by top 46%
      const start = vh * 0.92;
      const end = vh * 0.36;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0.18, Math.min(1, raw));
      setProgress(clamped);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Crisp glitch-decode effect on eyebrow & highlight pulse
  const triggerDecode = useCallback(() => {
    const target = PROFILE.aiManifesto.eyebrow[lang];
    setDecoding(true);
    let frame = 0;
    const totalFrames = 14;
    const timer = window.setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * target.length);
      const scrambled = target
        .split('')
        .map((char, idx) => {
          if (char === ' ' || idx < revealCount) return char;
          return SCRAMBLE_CHARS[(frame + idx * 3) % SCRAMBLE_CHARS.length];
        })
        .join('');
      setEyebrowDisplay(scrambled);

      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setEyebrowDisplay(target);
        setDecoding(false);
      }
    }, 34);
  }, [lang]);

  const segments = PROFILE.aiManifesto.segments;

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="scroll-mt-24 pt-6 lg:pt-7"
    >
      <Reveal>
        <BentoCard className="relative p-7 sm:p-10 lg:p-12 overflow-hidden">
          {/* Ultra-restrained editorial titanium top glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[220px] rounded-full bg-gradient-to-r from-[#0071E3]/15 via-violet-500/12 to-sky-400/15 dark:from-[#2997FF]/18 dark:via-violet-500/14 dark:to-cyan-400/14 blur-3xl"
          />

          {/* Top Bar: Eyebrow + Micro Actions */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 mb-7">
            <button
              type="button"
              onClick={triggerDecode}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.14em] bg-black/[0.045] dark:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.1] text-zinc-700 dark:text-zinc-200 hover:border-[#0071E3]/40 dark:hover:border-[#2997FF]/40 transition-colors"
              title={lang === 'zh' ? '点击触发故障字符解码' : 'Replay glitch decode'}
            >
              <Sparkles
                className={[
                  'w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]',
                  decoding ? 'animate-spin' : '',
                ].join(' ')}
              />
              <span>{eyebrowDisplay}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerDecode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-black/[0.035] dark:bg-white/[0.05] hover:bg-black/[0.07] dark:hover:bg-white/[0.11] hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '解码' : 'Decode'}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    PROFILE.aiManifesto.fullText[lang],
                    lang === 'zh'
                      ? '已复制「AI 的温柔」创作宣言'
                      : 'Copied AI Manifesto quote!'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '复制金句' : 'Copy Quote'}</span>
              </button>
            </div>
          </div>

          {/* Keynote Scroll-Illuminated Quote */}
          <blockquote className="relative max-w-5xl">
            <p
              className={[
                'text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] font-semibold tracking-[-0.025em] leading-[1.55] sm:leading-[1.52]',
                decoding ? 'manifesto-decode-pulse' : '',
              ].join(' ')}
            >
              {segments.map((seg, idx) => {
                // Smoothly cascade illumination segment-by-segment as user scrolls
                const threshold = idx / segments.length;
                const localProgress = Math.max(
                  0,
                  Math.min(1, (progress - threshold * 0.72) / 0.28)
                );
                const opacity = 0.24 + localProgress * 0.76;

                return (
                  <span
                    key={idx}
                    style={{ opacity }}
                    className={[
                      'transition-opacity duration-300 ease-out',
                      seg.highlight
                        ? 'manifesto-highlight'
                        : 'text-[#1D1D1F] dark:text-white',
                    ].join(' ')}
                  >
                    {seg.text[lang]}
                  </span>
                );
              })}
            </p>
          </blockquote>

          {/* Subtle Editorial Footer Line */}
          <div className="relative mt-7 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#0071E3] dark:bg-[#2997FF] rounded-full" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {PROFILE.name[lang]}
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">·</span>
              <span>{PROFILE.philosophy[lang]}</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 tracking-wide">
              {lang === 'zh'
                ? '降低门槛 · 平等落地 · 自由时间 ∞'
                : 'ZERO BARRIERS · EQUAL CREATION · FREE TIME ∞'}
            </div>
          </div>
        </BentoCard>
      </Reveal>
    </section>
  );
};
