import React, { useCallback, useEffect, useState } from 'react';
import { Copy, QrCode, X } from 'lucide-react';
import { ContactSection } from './components/ContactSection';
import { HeroBento } from './components/HeroBento';
import { Navbar } from './components/Navbar';
import { NotesSection } from './components/NotesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Toast } from './components/Toast';
import { Lang, PROFILE, UI_TEXT } from './data/profile';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('homepage_lang');
    return saved === 'en' ? 'en' : 'zh';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('homepage_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<'wechat' | 'official' | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('homepage_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('homepage_lang', lang);
    document.title =
      lang === 'zh'
        ? `${PROFILE.name.zh} · 故障浪漫主页`
        : `${PROFILE.name.en} · Glitch Romance Hub`;
  }, [lang]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = setTimeout(() => setToastMsg(null), 2400);
    return () => clearTimeout(timer);
  }, [toastMsg]);

  const handleCopy = useCallback(
    async (text: string, feedback: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast(feedback);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(feedback);
      }
    },
    [showToast]
  );

  return (
    <div className="min-h-screen ambient-backdrop transition-colors duration-300">
      <Toast message={toastMsg} />

      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-14">
        <HeroBento lang={lang} onOpenQr={() => setQrModal('wechat')} />
        <ProjectsSection lang={lang} />
        <NotesSection lang={lang} onCopy={handleCopy} />
        <ContactSection
          lang={lang}
          onCopy={handleCopy}
          onOpenQr={() => setQrModal('wechat')}
          onOpenOfficialQr={() => setQrModal('official')}
          onNotify={showToast}
        />
      </main>

      <footer className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-7 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <div>
          © {new Date().getFullYear()} {PROFILE.name[lang]} · {PROFILE.role[lang]}
        </div>
        <div className="font-mono">{PROFILE.handle}</div>
      </footer>

      {/* WeChat / Official Account QR Code Enlarged Modal */}
      {qrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
          onClick={() => setQrModal(null)}
        >
          <div
            className="w-full max-w-sm rounded-[32px] bg-white dark:bg-[#161618] border border-black/10 dark:border-white/12 shadow-2xl p-6 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQrModal(null)}
              aria-label="Close QR modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-white">
              {qrModal === 'official'
                ? lang === 'zh'
                  ? '关注我的公众号'
                  : 'Follow Official Account'
                : UI_TEXT.contact.qrModalTitle[lang]}
            </h3>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              {qrModal === 'official'
                ? PROFILE.contact.officialAccountName
                : `WeChat: ${PROFILE.contact.wechatId}`}
            </p>

            <div className="my-5 mx-auto w-64 h-64 rounded-3xl bg-white p-2.5 shadow-inner border border-black/5 flex items-center justify-center overflow-hidden">
              {(qrModal === 'official'
                ? PROFILE.contact.officialAccountQrUrl
                : PROFILE.contact.wechatQrUrl) ? (
                <img
                  src={
                    qrModal === 'official'
                      ? PROFILE.contact.officialAccountQrUrl
                      : PROFILE.contact.wechatQrUrl
                  }
                  alt={qrModal === 'official' ? 'Official Account QR Code' : 'WeChat QR Code'}
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <QrCode className="w-14 h-14 text-zinc-400" />
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                const targetText =
                  qrModal === 'official'
                    ? PROFILE.contact.officialAccountName
                    : PROFILE.contact.wechatId;
                handleCopy(
                  targetText,
                  qrModal === 'official'
                    ? lang === 'zh'
                      ? `已复制公众号名称：${targetText}`
                      : `Copied Official Account: ${targetText}`
                    : lang === 'zh'
                      ? `已复制微信号：${targetText}`
                      : `Copied WeChat: ${targetText}`
                );
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 transition-opacity"
            >
              <Copy className="w-4 h-4" />
              <span>
                {qrModal === 'official'
                  ? lang === 'zh'
                    ? '复制公众号名称'
                    : 'Copy Account Name'
                  : UI_TEXT.contact.copyWechat[lang]}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
