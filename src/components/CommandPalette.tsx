import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Download,
  Languages,
  Mail,
  MessageCircle,
  Moon,
  QrCode,
  Search,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import { Lang, PROFILE } from '../data/profile';
import { useModalEffect } from '../hooks/useModalEffect';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
  theme: 'dark' | 'light';
  glitchOverdrive: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onToggleOverdrive: () => void;
  onOpenQr: () => void;
  onCopy: (text: string, feedback: string) => void;
}

interface CommandAction {
  id: string;
  group: 'nav' | 'action' | 'pref';
  label: string;
  hint: string;
  keywords: string;
  icon: React.ReactNode;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  lang,
  theme,
  glitchOverdrive,
  onToggleLang,
  onToggleTheme,
  onToggleOverdrive,
  onOpenQr,
  onCopy,
}) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useModalEffect(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  const actions = useMemo<CommandAction[]>(() => {
    const scrollToSection = (id: string) => {
      onClose();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const qianchuanProject = PROFILE.projects[0];

    return [
      {
        id: 'nav-overview',
        group: 'nav',
        label: lang === 'zh' ? '前往：概览首屏' : 'Go to Overview',
        hint: '#overview',
        keywords: 'overview hero top manifesto 概览 首屏 宣言',
        icon: <Compass className="w-4 h-4" />,
        run: () => scrollToSection('overview'),
      },
      {
        id: 'nav-projects',
        group: 'nav',
        label: lang === 'zh' ? '前往：精选作品' : 'Go to Selected Work',
        hint: '#projects',
        keywords: 'projects work portfolio 作品 千川 插件 mv',
        icon: <ArrowRight className="w-4 h-4" />,
        run: () => scrollToSection('projects'),
      },
      {
        id: 'nav-notes',
        group: 'nav',
        label: lang === 'zh' ? '前往：实战手记' : 'Go to Notes',
        hint: '#notes',
        keywords: 'notes blog journal 手记 文章 复盘',
        icon: <ArrowRight className="w-4 h-4" />,
        run: () => scrollToSection('notes'),
      },
      {
        id: 'nav-contact',
        group: 'nav',
        label: lang === 'zh' ? '前往：联系 & 留言板' : 'Go to Contact & Guestbook',
        hint: '#contact',
        keywords: 'contact message guestbook 联系 留言 微信 邮箱',
        icon: <MessageCircle className="w-4 h-4" />,
        run: () => scrollToSection('contact'),
      },
      {
        id: 'act-copy-email',
        group: 'action',
        label: lang === 'zh' ? `复制邮箱：${PROFILE.contact.email}` : `Copy Email: ${PROFILE.contact.email}`,
        hint: 'Gmail',
        keywords: 'email gmail mail 邮箱 复制',
        icon: <Mail className="w-4 h-4" />,
        run: () => {
          onCopy(
            PROFILE.contact.email,
            lang === 'zh'
              ? `已复制邮箱：${PROFILE.contact.email}`
              : `Copied email: ${PROFILE.contact.email}`
          );
          onClose();
        },
      },
      {
        id: 'act-wechat-qr',
        group: 'action',
        label: lang === 'zh' ? '打开个人微信二维码' : 'Open WeChat QR Modal',
        hint: PROFILE.contact.wechatId,
        keywords: 'wechat qr scan 微信 二维码 扫码',
        icon: <QrCode className="w-4 h-4" />,
        run: () => {
          onClose();
          onOpenQr();
        },
      },
      {
        id: 'act-download-plugin',
        group: 'action',
        label:
          lang === 'zh'
            ? `直链下载：千川监控插件 (${qianchuanProject.version})`
            : `Download Qianchuan Monitor (${qianchuanProject.version})`,
        hint: '.zip',
        keywords: 'download plugin chrome zip 下载 千川 插件',
        icon: <Download className="w-4 h-4 text-emerald-500" />,
        run: () => {
          if (qianchuanProject.downloadUrl) {
            const link = document.createElement('a');
            link.href = qianchuanProject.downloadUrl;
            link.download = qianchuanProject.downloadFileName || 'Kamisama-Qianchuan.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          onClose();
        },
      },
      {
        id: 'pref-theme',
        group: 'pref',
        label:
          theme === 'dark'
            ? lang === 'zh'
              ? '切换到浅色模式'
              : 'Switch to Light Mode'
            : lang === 'zh'
              ? '切换到深色钛金模式'
              : 'Switch to Dark Titanium Mode',
        hint: theme === 'dark' ? 'Light' : 'Dark',
        keywords: 'theme dark light mode 深色 浅色 主题',
        icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />,
        run: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'pref-lang',
        group: 'pref',
        label: lang === 'zh' ? '切换界面语言为 English' : 'Switch Interface to 中文',
        hint: lang === 'zh' ? 'EN' : '中文',
        keywords: 'language english chinese 语言 英文 中文',
        icon: <Languages className="w-4 h-4" />,
        run: () => {
          onToggleLang();
          onClose();
        },
      },
      {
        id: 'pref-overdrive',
        group: 'pref',
        label: glitchOverdrive
          ? lang === 'zh'
            ? '关闭「故障浪漫 · 信号超频」彩蛋'
            : 'Disable Glitch Romance Overdrive'
          : lang === 'zh'
            ? '开启「故障浪漫 · 信号超频」彩蛋模式'
            : 'Enable Glitch Romance Overdrive',
        hint: glitchOverdrive ? 'ON' : 'Easter Egg',
        keywords: 'glitch romance overdrive easter egg 彩蛋 故障 超频 neon',
        icon: <Zap className="w-4 h-4 text-fuchsia-500 dark:text-fuchsia-400" />,
        run: () => {
          onToggleOverdrive();
          onClose();
        },
      },
    ];
  }, [
    lang,
    theme,
    glitchOverdrive,
    onClose,
    onCopy,
    onOpenQr,
    onToggleLang,
    onToggleTheme,
    onToggleOverdrive,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === 'Enter' && filtered[activeIdx]) {
      e.preventDefault();
      filtered[activeIdx].run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/55 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[26px] bg-white/95 dark:bg-[#161619]/95 border border-black/10 dark:border-white/14 shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl overflow-hidden"
      >
        {/* Search Input Row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.07] dark:border-white/[0.08]">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'zh'
                ? '输入命令、搜索区块或触发彩蛋...'
                : 'Type a command, jump to section, or toggle mode...'
            }
            className="flex-1 bg-transparent text-sm text-[#1D1D1F] dark:text-white placeholder:text-zinc-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions List */}
        <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-zinc-400">
              {lang === 'zh' ? '没有找到匹配的命令' : 'No matching commands'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={item.run}
                  className={[
                    'w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-left text-sm transition-colors',
                    isSelected
                      ? 'bg-[#0071E3]/12 dark:bg-[#2997FF]/18 text-[#1D1D1F] dark:text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-black/[0.04] dark:bg-white/[0.07] flex items-center justify-center shrink-0 text-zinc-600 dark:text-zinc-300">
                      {item.icon}
                    </span>
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                    {item.hint}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard Footer Hints */}
        <div className="px-4 py-2.5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ {lang === 'zh' ? '选择' : 'Move'}</span>
            <span>↵ {lang === 'zh' ? '执行' : 'Run'}</span>
            <span>ESC {lang === 'zh' ? '关闭' : 'Close'}</span>
          </div>
          <span>Kamisama · ⌘K</span>
        </div>
      </div>
    </div>
  );
};
