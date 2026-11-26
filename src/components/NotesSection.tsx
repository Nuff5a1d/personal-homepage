import React, { useState } from 'react';
import { ArrowRight, Copy, Sparkles, X } from 'lucide-react';
import { Lang, NoteItem, PROFILE, UI_TEXT } from '../data/profile';
import { BentoCard } from './BentoCard';

interface NotesSectionProps {
  lang: Lang;
  onCopy: (text: string, feedback: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ lang, onCopy }) => {
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);

  return (
    <section id="notes" className="scroll-mt-24 pt-14 sm:pt-18">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
          {lang === 'zh' ? '实战手记' : 'Notes'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {PROFILE.notes.map((note) => (
          <BentoCard
            key={note.id}
            interactive
            onClick={() => setActiveNote(note)}
            className="p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs mb-3.5">
                <span className="px-2.5 py-0.5 rounded-full font-medium bg-black/[0.045] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-200">
                  {note.tag[lang]}
                </span>
                <span className="font-mono text-zinc-400 dark:text-zinc-500">
                  {note.date}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#1D1D1F] dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                {note.title[lang]}
              </h3>

              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mt-2.5 line-clamp-2">
                {note.excerpt[lang]}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-black/[0.05] dark:border-white/[0.07] flex items-center justify-between text-xs font-medium text-[#0071E3] dark:text-[#2997FF]">
              <span>{UI_TEXT.notes.readMore[lang]}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Apple-style Immersive Reader Modal */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
          onClick={() => setActiveNote(null)}
        >
          <article
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[32px] bg-white dark:bg-[#161618] border border-black/10 dark:border-white/12 shadow-2xl p-6 sm:p-9 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveNote(null)}
              aria-label="Close reader"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/[0.1] dark:hover:bg-white/[0.15] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 dark:bg-[#2997FF]/15 text-[#0071E3] dark:text-[#2997FF] font-medium">
                {activeNote.tag[lang]}
              </span>
              <span className="font-mono">{activeNote.date}</span>
              <span>·</span>
              <span>{activeNote.readTime[lang]}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug text-[#1D1D1F] dark:text-white pr-8">
              {activeNote.title[lang]}
            </h3>

            <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-zinc-700 dark:text-zinc-300">
              {activeNote.paragraphs.map((p, idx) => (
                <p key={idx}>{p[lang]}</p>
              ))}
            </div>

            <div className="mt-7 p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08]">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {UI_TEXT.notes.takeaways[lang]}
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {activeNote.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#0071E3] dark:text-[#2997FF] font-bold">•</span>
                    <span>{point[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">{PROFILE.name[lang]}</span>
              <button
                type="button"
                onClick={() =>
                  onCopy(activeNote.shareCopy[lang], UI_TEXT.notes.copiedShare[lang])
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
                {UI_TEXT.notes.copyShare[lang]}
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};
