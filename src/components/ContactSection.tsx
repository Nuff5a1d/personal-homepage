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
import { Reveal } from './Reveal';

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
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const selectedTopic = topics[selectedTopicIdx] ?? topics[0];
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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  const [botcheck, setBotcheck] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botcheck) return;

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
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
      contact: trimmedContact || undefined,
      topic: selectedTopic,
      content: trimmedContent,
      createdAt: today,
    };

    const requests: Promise<unknown>[] = [];

    // 1. 邮件通知（Web3Forms → Gmail，官方要求客户端直接提交）
    const web3formsKey = (
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      PROFILE.contact.web3formsAccessKey ||
      ''
    ).trim();

    if (web3formsKey) {
      const emailPayload: Record<string, string> = {
        access_key: web3formsKey,
        subject: `【kamisama.si 新留言】${selectedTopic} - 来自 ${trimmedName}`,
        from_name: 'kamisama.si 个人主页',
        name: trimmedName,
        topic: selectedTopic,
        contact: trimmedContact || '未填写',
        message: [
          `主题：${selectedTopic}`,
          `称呼：${trimmedName}`,
          `联系方式（微信/邮箱）：${trimmedContact || '未填写'}`,
          ``,
          `留言内容：`,
          trimmedContent,
        ].join('\n'),
      };
      if (trimmedContact.includes('@')) {
        emailPayload.replyto = trimmedContact;
      }

      requests.push(
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(emailPayload),
        })
      );
    }

    // 2. 微信推送（Cloudflare Pages Function /api/message → 企微机器人 / PushPlus / 飞书 / Bark）
    requests.push(
      fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          topic: selectedTopic,
          content: trimmedContent,
          createdAt: today,
          botcheck: '',
        }),
      })
    );

    // 3. 兼容额外自定义 Webhook
    if (PROFILE.contact.messageWebhookUrl) {
      requests.push(
        fetch(PROFILE.contact.messageWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        })
      );
    }

    try {
      await Promise.allSettled(requests);
    } catch {
      // Still persist locally even if network fails
    }

    setMessages((prev) => [newMessage, ...prev].slice(0, 20));
    setName('');
    setContact('');
    setContent('');
    setSubmitting(false);
    onNotify(
      lang === 'zh'
        ? '留言已发送！我会在微信/邮箱收到你的联系方式与留言'
        : 'Message sent! I will receive your note and contact info'
    );
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-14 sm:pt-18 pb-10">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
            {lang === 'zh' ? '联系 & 留言' : 'Connect'}
          </h2>
        </div>
      </Reveal>

      <Reveal delayMs={60}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Left: Clean Dual QR Cards (WeChat + Official Account) & Channels (5 cols) */}
        <BentoCard className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between gap-6">
          {/* Dual QR Showcase */}
          <div className={PROFILE.contact.officialAccountQrUrl ? 'grid grid-cols-2 gap-3' : ''}>
            {/* Personal WeChat QR Tile */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-black/[0.025] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
              <button
                type="button"
                onClick={onOpenQr}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 shrink-0 overflow-hidden hover:scale-[1.03] transition-transform"
                title={lang === 'zh' ? '点击放大微信二维码' : 'Click to enlarge WeChat QR'}
              >
                <img
                  src={PROFILE.contact.wechatQrUrl}
                  alt="WeChat QR"
                  className="w-full h-full object-contain rounded-xl"
                />
              </button>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-3">
                <MessageCircle className="w-3.5 h-3.5" />
                {lang === 'zh' ? '个人微信' : 'WeChat'}
              </div>
              <div className="text-xs sm:text-sm font-semibold font-mono text-[#1D1D1F] dark:text-white mt-0.5 truncate max-w-full">
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
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:opacity-90 transition-opacity"
              >
                <Copy className="w-3 h-3" />
                {UI_TEXT.contact.copyWechat[lang]}
              </button>
            </div>

            {/* WeChat Official Account QR Tile */}
            {PROFILE.contact.officialAccountQrUrl && (
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-black/[0.025] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
                <button
                  type="button"
                  onClick={onOpenOfficialQr}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 shrink-0 overflow-hidden hover:scale-[1.03] transition-transform"
                  title={lang === 'zh' ? '点击放大公众号二维码' : 'Click to enlarge Official Account QR'}
                >
                  <img
                    src={PROFILE.contact.officialAccountQrUrl}
                    alt="WeChat Official Account QR"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </button>

                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3] dark:text-[#2997FF] mt-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  {lang === 'zh' ? '微信公众号' : 'Official Account'}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-white mt-0.5 truncate max-w-full">
                  {PROFILE.contact.officialAccountName || (lang === 'zh' ? '扫码关注动态' : 'Scan to Follow')}
                </div>
                <button
                  type="button"
                  onClick={onOpenOfficialQr}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/[0.06] dark:bg-white/[0.1] text-[#1D1D1F] dark:text-white hover:bg-black/[0.1] dark:hover:bg-white/[0.16] transition-colors"
                >
                  {lang === 'zh' ? '点击放大扫码' : 'Enlarge QR'}
                </button>
              </div>
            )}
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

            {PROFILE.contact.blogUrl && (
              <a
                href={PROFILE.contact.blogUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.055] dark:hover:bg-white/[0.08] transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0" />
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-white truncate">
                    {PROFILE.contact.blogName[lang]}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] shrink-0" />
              </a>
            )}
          </div>
        </BentoCard>

        {/* Right: Clean Interactive Message Board Panel (7 cols) */}
        <BentoCard className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Topic Pills */}
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, idx) => {
                  const active = selectedTopicIdx === idx;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopicIdx(idx)}
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

              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="botcheck"
                value={botcheck}
                onChange={(e) => setBotcheck(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {lang === 'zh'
                    ? '联系方式仅作者私密可见，不会在页面公开'
                    : 'Your contact info stays private and is sent directly to me'}
                </span>
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
      </Reveal>
    </section>
  );
};
