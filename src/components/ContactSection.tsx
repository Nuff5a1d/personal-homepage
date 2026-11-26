import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Copy,
  Github,
  Mail,
  MessageCircle,
  Send,
  Video,
} from 'lucide-react';
import { GuestMessage, Lang, PROFILE, UI_TEXT } from '../data/profile';
import { BentoCard } from './BentoCard';

interface ContactSectionProps {
  lang: Lang;
  onCopy: (text: string, feedback: string) => void;
  onOpenQr: () => void;
  onOpenOfficialQr: () => void;
  onNotify: (msg: string) => void;
}

const STORAGE_KEY = 'personal_homepage_guest_messages_v1';

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  onCopy,
  onOpenQr,
  onOpenOfficialQr,
  onNotify,
}) => {
  const topics = UI_TEXT.contact.topics[lang];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return PROFILE.initialMessages;
  });

  useEffect(() => {
    setSelectedTopic(UI_TEXT.contact.topics[lang][0]);
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) {
      onNotify(
        lang === 'zh'
          ? '请先填写你的称呼和留言内容'
          : 'Please enter your name and message'
      );
      return;
    }

    setSubmitting(true);
    const today = new Date().toISOString().slice(0, 10);
    const newMessage: GuestMessage = {
      id: `msg-${Date.now()}`,
      name: trimmedName,
      contact: contact.trim() || undefined,
      topic: selectedTopic,
      content: trimmedContent,
      createdAt: today,
    };

    if (PROFILE.contact.messageWebhookUrl) {
      try {
        await fetch(PROFILE.contact.messageWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        });
      } catch {
        // Still persist locally
      }
    }

    setMessages((prev) => [newMessage, ...prev].slice(0, 20));
    setName('');
    setContact('');
    setContent('');
    setSubmitting(false);
    onNotify(
      lang === 'zh'
        ? '留言已发布！感谢你的来信'
        : 'Message posted! Thanks for reaching out'
    );
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-14 sm:pt-18 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
          {lang === 'zh' ? '联系 & 留言' : 'Connect'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Left: Clean Contact & Live WeChat QR Card (5 cols) */}
        <BentoCard className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between gap-6">
          {/* Embedded Real WeChat QR Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-black/[0.025] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
            <button
              type="button"
              onClick={onOpenQr}
              className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 shrink-0 overflow-hidden hover:scale-[1.03] transition-transform"
              title={lang === 'zh' ? '点击放大二维码' : 'Click to enlarge QR'}
            >
              <img
                src={PROFILE.contact.wechatQrUrl}
                alt="WeChat QR"
                className="w-full h-full object-contain rounded-xl"
              />
            </button>

            <div className="text-center sm:text-left min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <MessageCircle className="w-3.5 h-3.5" />
                {lang === 'zh' ? '微信扫码添加' : 'Scan WeChat QR'}
              </div>
              <div className="text-base font-semibold font-mono text-[#1D1D1F] dark:text-white mt-1 truncate">
                {PROFILE.contact.wechatId}
              </div>
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    PROFILE.contact.wechatId,
                    lang === 'zh'
                      ? `已复制微信号：${PROFILE.contact.wechatId}`
                      : `Copied WeChat: ${PROFILE.contact.wechatId}`
                  )
                }
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 transition-opacity"
              >
                <Copy className="w-3 h-3" />
                {UI_TEXT.contact.copyWechat[lang]}
              </button>
            </div>
          </div>

          {/* Direct Channels List */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() =>
                onCopy(
                  PROFILE.contact.email,
                  lang === 'zh'
                    ? `已复制邮箱：${PROFILE.contact.email}`
                    : `Copied email: ${PROFILE.contact.email}`
                )
              }
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.055] dark:hover:bg-white/[0.08] transition-colors text-left group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF] shrink-0" />
                <span className="text-sm font-medium font-mono text-[#1D1D1F] dark:text-white truncate">
                  {PROFILE.contact.email}
                </span>
              </div>
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] shrink-0" />
            </button>

            <a
              href={PROFILE.contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.055] dark:hover:bg-white/[0.08] transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Github className="w-4 h-4 text-[#1D1D1F] dark:text-white shrink-0" />
                <span className="text-sm font-medium text-[#1D1D1F] dark:text-white truncate">
                  GitHub · Nuff5a1d
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] shrink-0" />
            </a>

            <a
              href={PROFILE.contact.douyinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.055] dark:hover:bg-white/[0.08] transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Video className="w-4 h-4 text-[#1D1D1F] dark:text-white shrink-0" />
                <span className="text-sm font-medium text-[#1D1D1F] dark:text-white truncate">
                  {lang === 'zh' ? '抖音 · ' : 'Douyin · '}
                  {PROFILE.contact.douyinName}
                </span>
                {PROFILE.contact.douyinId && (
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline shrink-0">
                    ID: {PROFILE.contact.douyinId}
                  </span>
                )}
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] shrink-0" />
            </a>

            {(PROFILE.contact.officialAccountName || PROFILE.contact.officialAccountQrUrl) && (
              <button
                type="button"
                onClick={() => {
                  if (PROFILE.contact.officialAccountQrUrl) {
                    onOpenOfficialQr();
                  } else if (PROFILE.contact.officialAccountName) {
                    onCopy(
                      PROFILE.contact.officialAccountName,
                      lang === 'zh'
                        ? `已复制公众号名称：${PROFILE.contact.officialAccountName}`
                        : `Copied Official Account: ${PROFILE.contact.officialAccountName}`
                    );
                  }
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.055] dark:hover:bg-white/[0.08] transition-colors text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-white truncate">
                    {lang === 'zh' ? '公众号 · ' : 'WeChat Official · '}
                    {PROFILE.contact.officialAccountName}
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                  {PROFILE.contact.officialAccountQrUrl
                    ? lang === 'zh'
                      ? '扫码关注'
                      : 'QR'
                    : lang === 'zh'
                      ? '复制搜索'
                      : 'Copy'}
                </span>
              </button>
            )}
          </div>
        </BentoCard>

        {/* Right: Clean Interactive Message Board Panel (7 cols) */}
        <BentoCard className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Topic Pills */}
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => {
                  const active = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={[
                        'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border',
                        active
                          ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-sm'
                          : 'bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 border-black/[0.05] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20',
                      ].join(' ')}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={UI_TEXT.contact.namePlaceholder[lang]}
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.09] text-[#1D1D1F] dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/40 dark:focus:ring-[#2997FF]/40 transition-all"
                />
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={UI_TEXT.contact.contactPlaceholder[lang]}
                  maxLength={60}
                  className="w-full px-4 py-3 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.09] text-[#1D1D1F] dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/40 dark:focus:ring-[#2997FF]/40 transition-all"
                />
              </div>

              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={UI_TEXT.contact.messagePlaceholder[lang]}
                maxLength={400}
                className="w-full px-4 py-3 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.09] text-[#1D1D1F] dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/40 dark:focus:ring-[#2997FF]/40 transition-all resize-none"
              />

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#0071E3] hover:bg-[#0077ED] text-white active:scale-[0.98] disabled:opacity-60 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{UI_TEXT.contact.submit[lang]}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Recent Messages Wall */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {UI_TEXT.contact.recentMessages[lang]}
              </span>
              <span className="text-xs font-mono text-zinc-400">{messages.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-2xl bg-black/[0.025] dark:bg-white/[0.035] border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white truncate">
                      {msg.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                      {msg.createdAt}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
