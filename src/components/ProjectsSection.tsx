import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  BellRing,
  Check,
  Disc3,
  Download,
  Layers,
  Play,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import {
  Lang,
  PROFILE,
  ProjectCategory,
  ProjectItem,
  UI_TEXT,
} from '../data/profile';
import { BentoCard } from './BentoCard';

interface ProjectsSectionProps {
  lang: Lang;
}

const RoiMiniPreview: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [roi, setRoi] = useState(4.67);
  const [delta, setDelta] = useState('+0.12');

  useEffect(() => {
    const samples = [4.67, 4.74, 4.62, 4.81, 4.71, 4.86];
    let idx = 0;
    const timer = setInterval(() => {
      const prev = samples[idx];
      idx = (idx + 1) % samples.length;
      const next = samples[idx];
      const diff = next - prev;
      setRoi(next);
      setDelta(`${diff >= 0 ? '+' : ''}${diff.toFixed(2)}`);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const isPositive = delta.startsWith('+');

  return (
    <div className="mt-5 p-4 rounded-2xl bg-zinc-950 text-white border border-white/10 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {lang === 'zh' ? '秒级监控中' : 'Live Guard'}
        </span>
        <span className="font-mono text-zinc-500">v1.1.3</span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[11px] text-zinc-400">
            {lang === 'zh' ? '综合营销 ROI' : 'Overall ROI'}
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight text-white">
              {roi.toFixed(2)}
            </span>
            <span
              className={[
                'text-xs font-mono font-medium px-1.5 py-0.5 rounded-md',
                isPositive
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-amber-500/15 text-amber-300',
              ].join(' ')}
            >
              {delta}
            </span>
          </div>
        </div>

        <svg viewBox="0 0 100 32" className="w-24 h-8 overflow-visible shrink-0">
          <defs>
            <linearGradient id="roiLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2997FF" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <path
            d="M2 24 C 16 21, 22 14, 36 16 C 48 18, 56 8, 70 11 C 82 13, 90 6, 98 4"
            fill="none"
            stroke="url(#roiLine)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="98" cy="4" r="3" fill="#34D399" />
        </svg>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center gap-1.5 text-[10px] text-zinc-400 truncate">
        <BellRing className="w-3 h-3 text-[#2997FF] shrink-0" />
        <span className="truncate">
          {lang === 'zh' ? '企微 · PushPlus · 飞书 · 钉钉 · Bark' : 'WeCom · PushPlus · Feishu · Bark'}
        </span>
      </div>
    </div>
  );
};

const MusicMiniPreview: React.FC<{ lang: Lang }> = ({ lang }) => (
  <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#161324] via-[#12121a] to-[#0b1322] text-white border border-white/10">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-sky-400 flex items-center justify-center shadow-lg shrink-0">
          <Disc3 className="w-5 h-5 text-white animate-spin [animation-duration:8s]" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-white truncate">
            {lang === 'zh' ? 'AI 视听情绪片' : 'AI Visual Album'}
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
            {lang === 'zh' ? '词曲 · 分镜 · 卡点' : 'Audio · Cinema Frames'}
          </div>
        </div>
      </div>

      <div className="flex items-end gap-1 h-5 shrink-0 px-0.5" aria-hidden="true">
        <span className="w-1 h-full bg-fuchsia-400 rounded-full origin-bottom animate-equalizer-1" />
        <span className="w-1 h-full bg-purple-400 rounded-full origin-bottom animate-equalizer-2" />
        <span className="w-1 h-full bg-sky-400 rounded-full origin-bottom animate-equalizer-3" />
        <span className="w-1 h-full bg-indigo-400 rounded-full origin-bottom animate-equalizer-4" />
      </div>
    </div>
  </div>
);

const PipelineMiniPreview: React.FC<{ lang: Lang }> = ({ lang }) => {
  const steps =
    lang === 'zh'
      ? ['选品', 'AI 文案', '自动上架']
      : ['Source', 'AI Copy', 'Auto-List'];

  return (
    <div className="mt-5 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08]">
      <div className="flex items-center justify-between gap-1 text-[11px] font-medium">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <span className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-200 truncate">
              {step}
            </span>
            {i < steps.length - 1 && (
              <span className="text-zinc-400 dark:text-zinc-600 shrink-0">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ['all', 'tool', 'creative', 'automation'];
  const filteredProjects =
    activeCategory === 'all'
      ? PROFILE.projects
      : PROFILE.projects.filter((p) => p.category === activeCategory);

  const statusStyles: Record<ProjectItem['status'], string> = {
    live: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    building: 'bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/20',
    exploring: 'bg-purple-500/12 text-purple-700 dark:text-purple-300 border-purple-500/20',
  };

  const renderIcon = (visualType: ProjectItem['visualType']) => {
    switch (visualType) {
      case 'roi':
        return <Activity className="w-5 h-5 text-[#0071E3] dark:text-[#2997FF]" />;
      case 'music':
        return <Play className="w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400" />;
      case 'pipeline':
        return <Workflow className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'lab':
        return <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
    }
  };

  const gridClass =
    filteredProjects.length === 1
      ? 'grid-cols-1 lg:grid-cols-2'
      : filteredProjects.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';

  return (
    <section id="projects" className="scroll-mt-24 pt-14 sm:pt-18">
      {/* Clean Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
          {lang === 'zh' ? '精选作品' : 'Selected Work'}
        </h2>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-black/[0.045] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] self-start overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                  active
                    ? 'bg-white dark:bg-white text-[#1D1D1F] shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-[#1D1D1F] dark:hover:text-white',
                ].join(' ')}
              >
                {UI_TEXT.projects.filters[cat][lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panoramic Full-Width Bento Grid */}
      <div className={`grid ${gridClass} gap-5 lg:gap-6`}>
        {filteredProjects.map((project) => (
          <BentoCard
            key={project.id}
            interactive
            onClick={() => setSelectedProject(project)}
            className="p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center">
                  {renderIcon(project.visualType)}
                </div>

                <span
                  className={[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border',
                    statusStyles[project.status],
                  ].join(' ')}
                >
                  {UI_TEXT.projects.status[project.status][lang]}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                {project.title[lang]}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3">
                {project.summary[lang]}
              </p>

              {/* Embedded micro previews */}
              {project.visualType === 'roi' && <RoiMiniPreview lang={lang} />}
              {project.visualType === 'music' && <MusicMiniPreview lang={lang} />}
              {project.visualType === 'pipeline' && <PipelineMiniPreview lang={lang} />}
              {project.visualType === 'lab' && (
                <div className="mt-5 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-500" />
                    {lang === 'zh' ? 'Idea → Ship' : 'Idea → Ship'}
                  </span>
                  <span className="font-mono text-[11px] text-purple-500 dark:text-purple-400">
                    ∞
                  </span>
                </div>
              )}
            </div>

            {/* Clean Footer CTA */}
            <div className="mt-5 pt-4 border-t border-black/[0.05] dark:border-white/[0.07] flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">
                  {project.version}
                </span>
                {project.downloadUrl && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <Download className="w-2.5 h-2.5" />
                    {lang === 'zh' ? '直链下载' : 'Direct ZIP'}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1 font-medium text-[#0071E3] dark:text-[#2997FF] shrink-0">
                {UI_TEXT.projects.viewDetail[lang]}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Apple Frosted Glass Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[32px] bg-white dark:bg-[#161618] border border-black/10 dark:border-white/12 shadow-2xl p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/[0.1] dark:hover:bg-white/[0.15] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <span
                className={[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                  statusStyles[selectedProject.status],
                ].join(' ')}
              >
                {UI_TEXT.projects.status[selectedProject.status][lang]}
              </span>
              <span className="text-xs font-mono text-zinc-400">{selectedProject.version}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white pr-10">
              {selectedProject.title[lang]}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {selectedProject.subtitle[lang]}
            </p>

            <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 mt-5">
              {selectedProject.summary[lang]}
            </p>

            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                {UI_TEXT.projects.modalStory[lang]}
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {selectedProject.story[lang]}
              </p>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                {UI_TEXT.projects.modalHighlights[lang]}
              </div>
              <ul className="space-y-2.5">
                {selectedProject.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-[#0071E3]/12 dark:bg-[#2997FF]/15 text-[#0071E3] dark:text-[#2997FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="leading-relaxed">{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProject.installSteps && selectedProject.installSteps.length > 0 && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08] border border-emerald-500/15">
                <div className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-300 mb-2">
                  {lang === 'zh' ? '免 GitHub 快速安装（3 步）' : 'Quick Install (No GitHub Needed)'}
                </div>
                <ol className="space-y-1.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
                  {selectedProject.installSteps.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step[lang]}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-7 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-end gap-3">
              {selectedProject.downloadUrl && (
                <a
                  href={selectedProject.downloadUrl}
                  download={selectedProject.downloadFileName || true}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {selectedProject.downloadLabel
                      ? selectedProject.downloadLabel[lang]
                      : lang === 'zh'
                        ? '直接下载安装包 (.zip)'
                        : 'Download Package (.zip)'}
                  </span>
                </a>
              )}

              {selectedProject.linkUrl && selectedProject.linkLabel && (
                <a
                  href={selectedProject.linkUrl}
                  target={selectedProject.linkUrl.startsWith('#') ? undefined : '_blank'}
                  rel={selectedProject.linkUrl.startsWith('#') ? undefined : 'noreferrer'}
                  onClick={() => {
                    if (selectedProject.linkUrl?.startsWith('#')) {
                      setSelectedProject(null);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-[#0071E3] hover:bg-[#0077ED] text-white transition-colors"
                >
                  <span>{selectedProject.linkLabel[lang]}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
