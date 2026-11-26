export type Lang = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en: string;
}

export type ProjectCategory = 'all' | 'tool' | 'creative' | 'automation';
export type ProjectStatus = 'live' | 'building' | 'exploring';

export interface ProjectItem {
  id: string;
  category: Exclude<ProjectCategory, 'all'>;
  status: ProjectStatus;
  version: string;
  featured?: boolean;
  visualType: 'roi' | 'music' | 'pipeline' | 'lab';
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  story: LocalizedText;
  highlights: LocalizedText[];
  tags: string[];
  linkLabel?: LocalizedText;
  linkUrl?: string;
  downloadLabel?: LocalizedText;
  downloadUrl?: string;
  downloadFileName?: string;
  installSteps?: LocalizedText[];
  secondaryLabel?: LocalizedText;
  secondaryUrl?: string;
}

export interface NoteItem {
  id: string;
  date: string;
  readTime: LocalizedText;
  tag: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  shareCopy: LocalizedText;
  paragraphs: LocalizedText[];
  takeaways: LocalizedText[];
}

export interface GuestMessage {
  id: string;
  name: string;
  contact?: string;
  topic: string;
  content: string;
  createdAt: string;
}

/**
 * =====================================================================
 *  ★ 个人主页集中配置文件（替换你自己的昵称、项目、微信号、抖音链接都在这里）
 * =====================================================================
 */
export const PROFILE = {
  /** 基础身份信息 */
  name: {
    zh: 'Kamisama',
    en: 'Kamisama',
  },
  handle: '@OliverRockwell',
  /** 本地头像路径（位于 public/avatar.webp） */
  avatarUrl: './avatar.webp',
  /** 首屏右侧视觉背景图（位于 public/hero-bg.webp） */
  heroVisualUrl: './hero-bg.webp',
  avatarMonogram: 'K',
  role: {
    zh: '故障浪漫主页',
    en: 'Glitch Romance Hub',
  },
  heroHeadline: {
    zh: '一句话太短了，介绍不完。',
    en: 'One sentence is too short to sum me up.',
  },
  heroDescription: {
    zh: '用 AI 写趁手的效率工具，也拍有情绪的视听作品——把脑海里的 Idea，一一做成真实存在的东西。',
    en: 'Building sharp AI tools and atmospheric visual works — turning sparks of ideas into shipped reality.',
  },
  statusBadge: {
    zh: '故障浪漫主页',
    en: 'Glitch Romance Hub',
  },
  location: {
    zh: '陕西 · 信号在线',
    en: 'Online · Building',
  },
  philosophy: {
    zh: '理性造工具，感性做浪漫。',
    en: 'Sharp tools, raw romance.',
  },

  /** 插件联动徽章文案 */
  pluginOriginBanner: {
    zh: '千川 ROI 监控插件作者',
    en: 'Creator of Qianchuan ROI Monitor',
  },

  /** 个人核心标签 / 能力栈 */
  skills: [
    { label: { zh: '故障浪漫', en: 'Glitch Romance' }, level: '' },
    { label: { zh: 'Chrome 插件', en: 'Extensions' }, level: '' },
    { label: { zh: 'AI 音乐 MV', en: 'AI Music MV' }, level: '' },
    { label: { zh: '电商自动化', en: 'Automation' }, level: '' },
  ],

  /** 联系方式与社媒账号（一键复制 + 扫码卡片） */
  contact: {
    wechatId: 'OliverRockwell',
    wechatQrUrl: './wechat-qr.webp',
    /** 微信公众号（填入名称与二维码路径后自动显示） */
    officialAccountName: '',
    officialAccountQrUrl: '',
    douyinName: 'kamisama',
    douyinId: '22573568',
    douyinUrl: 'https://www.douyin.com/user/MS4wLjABAAAA54yVIZJcTp0TQChSyDIFac3SflhtRz4unP5jFfitYKM?from_tab_name=main',
    email: 'shuorockwell@gmail.com',
    githubUrl: 'https://github.com/Nuff5a1d',
    /**
     * 可选：配置留言推送 Webhook（如企业微信机器人 / 飞书机器人 / Formspree 接口）
     * 留空时，留言会直接保存在浏览器本地并即时显示在留言墙中。
     */
    messageWebhookUrl: '',
  },

  /** 精选项目 / 作品集 */
  projects: [
    {
      id: 'qianchuan-roi-monitor',
      category: 'tool',
      status: 'live',
      version: 'v1.3.1',
      featured: true,
      visualType: 'roi',
      title: {
        zh: 'Kamisama · 全链路千川监控',
        en: 'Kamisama · Qianchuan ROI Monitor',
      },
      subtitle: {
        zh: '巨量千川秒级盯盘 + AI 30分钟总结报告 · Chrome 插件（开源）',
        en: 'Real-Time OceanEngine ROI Sentinel & AI Summary · Chrome Extension',
      },
      summary: {
        zh: '不再靠肉眼死盯大屏。深度适配千川乘方、调控、全域推商品、推直播间与抖店罗盘，秒级监控 ROI、预算撞墙、灰保过保与掉登录/断流异常；内置 30 分钟趋势总结报告（支持豆包 / 智谱 / DeepSeek / 通义 AI 分析），并通过企微、PushPlus、飞书、钉钉、Bark 直达手机。',
        en: 'Stop staring at ad dashboards 24/7. Tracks ROI, budget caps, and account health across Qianchuan & Compass in real time, with 30-min AI trend summaries (Doubao/Zhipu/DeepSeek/Qwen) and 5-channel mobile alerts.',
      },
      story: {
        zh: '最初只是不想再为盯盘耗尽精力，用 AI 一边拆解千川复杂的双表 DOM 与虚拟滚动结构，一边从 v1.0 迭代到 v1.3.1。把真实投流踩过的坑——目标 ROI 干扰列、预算撞墙、灰保过保、SPA 切页串位、页面静默卡死——全部写成了稳定可靠的防守机制。',
        en: 'Born from the frustration of manually watching ad spend. Iterated rapidly with AI to v1.3.1, solving split DOM headers, budget-cap alerts, virtual scrolling, target-ROI noise, and silent page freezes.',
      },
      highlights: [
        {
          zh: '全链路兼容千川乘方、调控、全域推商品、推直播间与抖店罗盘，精准规避「目标/出价 ROI」干扰列',
          en: 'Full coverage across Qianchuan & Compass tables, filtering out target/bid ROI noise columns',
        },
        {
          zh: 'ROI 波动 + 预算撞墙 + 灰保过保 + 掉登录态/接口报错/数据断流全方位健康哨兵',
          en: 'Real-time ROI, budget-cap, protection status, session timeout, and stale-data health guards',
        },
        {
          zh: '内置 30 分钟趋势总结报告，支持接入豆包 / 智谱 / DeepSeek / 通义千问 AI 复盘分析',
          en: 'Built-in 30-min trend reports powered by Doubao, Zhipu, DeepSeek, or Qwen AI',
        },
        {
          zh: '五大渠道三层持久化直达手机：企业微信（个人微信直收）、PushPlus、飞书、钉钉、Bark',
          en: '5-channel mobile push: WeCom, PushPlus, Feishu, DingTalk, Bark & desktop sound',
        },
      ],
      tags: ['Chrome MV3', '免 GitHub 直下', 'AI 复盘', '五通道告警'],
      downloadLabel: { zh: '直接下载安装包 (v1.3.1)', en: 'Download ZIP (v1.3.1)' },
      downloadUrl: './downloads/Kamisama-Qianchuan-v1.3.1.zip',
      downloadFileName: 'Kamisama-Qianchuan-v1.3.1.zip',
      installSteps: [
        {
          zh: '点击下方「直接下载安装包」获取 Kamisama-Qianchuan-v1.3.1.zip，双击解压出文件夹。',
          en: 'Click "Download ZIP" below and unzip Kamisama-Qianchuan-v1.3.1.zip into a folder.',
        },
        {
          zh: '在 Chrome 地址栏输入 chrome://extensions（Edge 输入 edge://extensions），打开右上角「开发者模式」。',
          en: 'Open chrome://extensions (or edge://extensions) and enable "Developer mode" at top right.',
        },
        {
          zh: '点击左上角「加载已解压的扩展程序」，选中解压后的文件夹即可启用，无需 GitHub 账号。',
          en: 'Click "Load unpacked" and select the extracted folder — no GitHub account required.',
        },
      ],
      linkLabel: { zh: '前往 GitHub 查看源码', en: 'View on GitHub' },
      linkUrl: 'https://github.com/Nuff5a1d/Kamisama-Qianchuan',
    },
    {
      id: 'ai-music-mv',
      category: 'creative',
      status: 'live',
      version: 'Series',
      featured: true,
      visualType: 'music',
      title: {
        zh: 'AI 音乐 MV 视听创作',
        en: 'AI Music & MV Studio',
      },
      subtitle: {
        zh: 'AIGC 词曲编排 · 电影感分镜视觉',
        en: 'AIGC Audio-Visual Direction & Storytelling',
      },
      summary: {
        zh: '探索声音与画面的 AI 协同美学。从旋律情绪设计、歌词打磨，到一致性的电影级分镜画面与卡点剪辑，将脑海里的氛围完整拍成 MV，并在抖音持续分享幕后创作流程。',
        en: 'Exploring cinema-grade storytelling powered by generative audio and video. From emotional composition and lyric craft to consistent visual storyboards and beat-synced edits.',
      },
      story: {
        zh: '做效率工具偏向理性与逻辑，而做 AI 音乐 MV 是我释放感性与审美的出口。把同一套工程化拆解思维用在视觉分镜和提示词控制上，也能做出很有电影质感的短片。',
        en: 'While tools satisfy engineering rigor, AI music videos are where emotion and visual craft meet. Applying structured prompt pipelines brings film-like consistency to every frame.',
      },
      highlights: [
        {
          zh: '全链路 AIGC 生产流：作词作曲 → 角色与光影风格定调 → 分镜生图/视频 → 节拍剪辑',
          en: 'End-to-end AIGC pipeline: songcraft → art direction → video generation → rhythm editing',
        },
        {
          zh: '沉淀可复用的六段式镜头提示词模板，显著提升画面质感与镜头连贯性',
          en: 'Reusable cinematic prompt templates for stronger lighting and shot continuity',
        },
        {
          zh: '同步在抖音 & 朋友圈分享完整成片与幕后制作思路',
          en: 'Full MVs and behind-the-scenes workflows shared regularly on Douyin',
        },
      ],
      tags: ['AI 音乐', 'AI 视频分镜', '视觉叙事', '抖音作品'],
      linkLabel: { zh: '去抖音看成片', en: 'Watch on Douyin' },
      linkUrl: 'https://www.douyin.com/user/MS4wLjABAAAA54yVIZJcTp0TQChSyDIFac3SflhtRz4unP5jFfitYKM?from_tab_name=main',
    },
    {
      id: 'auto-listing-engine',
      category: 'automation',
      status: 'building',
      version: 'Beta',
      visualType: 'pipeline',
      title: {
        zh: '电商商品智能自动上架',
        en: 'Smart Auto-Listing Engine',
      },
      subtitle: {
        zh: '自动化工作流 · 从选品到发布提效 10x',
        en: 'Automation Pipeline · 10x Faster Publishing',
      },
      summary: {
        zh: '针对电商高频重复的上架操作，结合 AI 视觉理解与结构化表单填充，自动完成商品信息清洗、卖点标题生成、规格映射与一键上架草稿，把人从机械劳动里解放出来。',
        en: 'Eliminating repetitive product uploading by combining AI copy/attribute extraction with automated form orchestration — turning hours of manual listing into minutes.',
      },
      story: {
        zh: '做电商运营的人都懂，每天重复填 SKU、写标题、传主图有多消耗精力。这个项目正在把整条上架链路拆成标准化节点，逐步打通自动校验与批量发布。',
        en: 'Anyone in e-commerce knows how draining repetitive SKU entry is. This project breaks the entire listing pipeline into modular AI-assisted steps.',
      },
      highlights: [
        {
          zh: '商品原始资料自动解析与合规词预检',
          en: 'Automated source parsing and compliance keyword pre-checks',
        },
        {
          zh: 'AI 根据类目爆款特征生成高点击标题与卖点结构',
          en: 'Category-aware AI title and selling-point generation',
        },
        {
          zh: '支持草稿预审机制，兼顾极致效率与人工把控',
          en: 'Human-in-the-loop draft preview balancing speed with safety',
        },
      ],
      tags: ['电商自动化', 'AI 工作流', 'RPA / 插件', '研发中'],
      linkLabel: { zh: '预约内测交流', en: 'Join Beta Talk' },
      linkUrl: '#contact',
    },
    {
      id: 'ai-idea-lab',
      category: 'automation',
      status: 'exploring',
      version: 'Lab',
      visualType: 'lab',
      title: {
        zh: 'AI 创意实验工坊 · Idea Lab',
        en: 'AI Idea Lab & Micro-Tools',
      },
      subtitle: {
        zh: '持续落地的小工具与个人实验合集',
        en: 'Rapid Prototypes & Weekend Experiments',
      },
      summary: {
        zh: '我的灵感蓄水池。每当工作或生活里冒出一个「要是有个小工具就好了」的念头，就会在这里快速用 AI 做出最小可用原型，验证价值后再升级为正式产品。',
        en: 'My personal sandbox for turning everyday friction into rapid AI prototypes. Whenever a "wish this existed" moment strikes, it starts here.',
      },
      story: {
        zh: 'AI 时代最稀缺的不是代码本身，而是敏锐的痛点洞察和把想法真正落地的执行力。如果你也有好玩的点子，欢迎在下方留言板一起碰撞。',
        en: 'In the AI era, code is abundant — taste, real-world insight, and execution are the real edge. Drop an idea in the message board below if you want to jam.',
      },
      highlights: [
        {
          zh: '坚持 48 小时原型原则：先跑通核心价值，再打磨视觉与细节',
          en: '48-hour prototype rule: prove real value first, then polish to Apple-grade craft',
        },
        {
          zh: '覆盖浏览器提效、数据监控脚本、创意内容工作流等多个方向',
          en: 'Spans browser extensions, data monitors, and creative media pipelines',
        },
      ],
      tags: ['快速原型', 'AI Agent', '开放共创'],
      linkLabel: { zh: '提交你的点子', en: 'Pitch an Idea' },
      linkUrl: '#contact',
    },
  ] as ProjectItem[],

  /** 实战手记 / 思考专栏（适合发抖音 & 朋友圈引流阅读） */
  notes: [
    {
      id: 'note-roi-plugin',
      date: '2026.11',
      readTime: { zh: '3 分钟阅读', en: '3 min read' },
      tag: { zh: '项目复盘', en: 'Build Log' },
      title: {
        zh: '用 AI 从 0 到 1 写一个千川 ROI 秒级监控插件，我踩过的 4 个真实坑',
        en: 'Building a Real-Time ROI Monitor Extension with AI: 4 Real Pitfalls',
      },
      excerpt: {
        zh: '为什么网上很多简单脚本在千川后台一跑就失效？聊聊虚拟滚动表格、拆分双表、目标 ROI 干扰列和 SPA 切页重绑的实战解法。',
        en: 'Why naive DOM scripts break on modern ad dashboards — lessons from handling virtual tables, split headers, and SPA route switching.',
      },
      shareCopy: {
        zh: '刚把「千川 ROI 实时监控插件」升级到 v1.1.3，总结了用 AI 做插件踩过的 4 个真实大坑，主页里可以看完整复盘与功能细节。',
        en: 'Just shipped v1.1.3 of my Qianchuan ROI Live Monitor extension — wrote down 4 real engineering pitfalls I solved along the way.',
      },
      paragraphs: [
        {
          zh: '最初做这个插件的原因非常朴素：投流时不可能 24 小时死盯屏幕，但 ROI 一旦跌破成本线、或者后台悄无声息掉登录态，哪怕晚发现半小时都是真金白银的损失。',
          en: 'The motivation was simple: nobody can stare at ad dashboards 24/7, yet a sudden ROI drop or silent session timeout can cost real money within minutes.',
        },
        {
          zh: '真正动手用 AI 写代码时才发现，Demo 跑通只需要一小时，但要做到真实投流环境里“稳如老狗”，90% 的精力都花在边缘场景里：比如千川乘方把表头和数据拆成两个独立 table、整体 ROI 数字被拆成整数和小数两个 DOM 节点、还有「目标 ROI」和「真实支付 ROI」长得几乎一模一样。',
          en: 'Getting a prototype working took an hour, but making it bulletproof in production meant tackling split table DOMs, fragmented numeric nodes, and visually identical metric columns.',
        },
        {
          zh: '解决这些问题的关键，不是让 AI 盲目重试，而是把页面真实结构抓出来做“一键结构诊断”，用精准的规则把异常兜住。也正因为这次经历，我更确定：把自己的业务痛点 + AI 执行力结合起来，普通人也能做出真正好用的专业工具。',
          en: 'The breakthrough was building a one-click DOM diagnostic exporter so AI could reason over real structure rather than guessing. Domain pain + AI execution is a true superpower.',
        },
      ],
      takeaways: [
        {
          zh: '先抓真实业务场景的极端 Case，再让 AI 写防守逻辑，稳定性会提升一个量级',
          en: 'Feed real-world edge cases to AI before asking for resilient logic',
        },
        {
          zh: '监控类工具必须有“心跳/断流哨兵”，防止页面静默卡死却以为一切正常',
          en: 'Always add a stale-data heartbeat guard so silent freezes never go unnoticed',
        },
        {
          zh: '把个人主页挂进工具里，能把每一次使用都沉淀成自己的个人品牌资产',
          en: 'Linking your personal hub inside your tools turns every user into a brand touchpoint',
        },
      ],
    },
    {
      id: 'note-ai-mv',
      date: '2026.11',
      readTime: { zh: '2 分钟阅读', en: '2 min read' },
      tag: { zh: 'AI 创作', en: 'AIGC Craft' },
      title: {
        zh: 'AI 音乐 MV 制作笔记：如何告别“塑料感”，拍出高级电影氛围？',
        en: 'Crafting AI Music Videos: Moving Beyond Generic Clips to Cinema Feel',
      },
      excerpt: {
        zh: '很多人生成的 AI 视频单看还行，拼在一起就出戏。核心秘密在于统一色调锚点、克制镜头运动，以及让画面呼吸感跟着鼓点走。',
        en: 'Individual AI clips often look fine alone yet feel disjointed together. The secret lies in lighting anchors, restrained camera motion, and rhythmic pacing.',
      },
      shareCopy: {
        zh: '分享一下我最近做 AI 音乐 MV 的踩坑心得：如何告别 AI 塑料感，做出统一的高级电影氛围。',
        en: 'Notes from producing my latest AI music videos — how lighting anchors and rhythmic editing transform generative clips.',
      },
      paragraphs: [
        {
          zh: '做 AI 音乐 MV 最容易踩的坑，就是每个镜头都想堆满华丽特效，结果 3 分钟看下来观众视觉疲劳，完全记不住情绪。',
          en: 'The biggest trap in AI music videos is overloading every shot with flashy effects, leaving viewers visually exhausted instead of emotionally moved.',
        },
        {
          zh: '我现在的做法刚好相反：先定好整首歌的“光影主基调”（比如雨夜霓虹冷蓝 + 暖琥珀肤色），所有分镜共享同一套质感词与镜头语言；副歌爆发前故意给 2 秒克制的留白特写，情绪张力立刻就出来了。',
          en: 'Instead, I lock a single lighting palette for the entire track and pair quiet, restrained close-ups right before the chorus hits — contrast creates real cinema.',
        },
      ],
      takeaways: [
        {
          zh: '先定歌的情绪曲线，再画分镜，永远让画面服务于音乐节拍',
          en: 'Map the emotional arc of the track first; every cut should serve the rhythm',
        },
        {
          zh: '少即是多：统一色温与景深，比堆砌复杂形容词高级十倍',
          en: 'Less is more: consistent color temperature beats bloated prompt adjectives',
        },
      ],
    },
    {
      id: 'note-idea-to-ship',
      date: '2026.10',
      readTime: { zh: '2 分钟阅读', en: '2 min read' },
      tag: { zh: '独立思考', en: 'Maker Ethos' },
      title: {
        zh: '想法人人都有，为什么我坚持用 AI 把每个 Idea 真正落地？',
        en: 'Everyone Has Ideas — Why I Ship Mine with AI Instead of Just Talking',
      },
      excerpt: {
        zh: '从千川监控插件到自动上架工具，再到个人主页和抖音分享。记录自己如何用「做产品 + 写复盘」滚起个人标签的雪球。',
        en: 'From ROI extensions to auto-listing pipelines and public storytelling — how shipping small real products builds compounding leverage.',
      },
      shareCopy: {
        zh: 'AI 时代最爽的事情，就是昨天冒出来的想法，今天就能跑在浏览器里。把每一个落地的项目都收进我的个人主页。',
        en: 'The best part of the AI era: an idea from last night can run in your browser today.',
      },
      paragraphs: [
        {
          zh: '以前脑子里有很多好点子，最后都停留在备忘录里吃灰——因为找人开发太贵、自己从零学全栈周期又太长。',
          en: 'Previously, great ideas gathered dust in notes because hiring engineers was costly and learning every stack from scratch took months.',
        },
        {
          zh: '现在有了 AI，只要你真正理解业务痛点、审美在线、愿意一点点打磨细节，一个人就是一支微型产品团队。把做出来的工具发发抖音、聊聊前后开发踩坑，既能帮到同频的人，也能自然沉淀出属于自己的个人名片。',
          en: 'Today, domain insight plus good taste plus AI turns one person into a nimble product studio. Sharing the build journey publicly naturally attracts like-minded builders and collaborators.',
        },
      ],
      takeaways: [
        {
          zh: '先完成，再完美：让第一个真实用户（哪怕是自己）先用起来',
          en: 'Ship first, refine continuously — make yourself user #1',
        },
        {
          zh: '公开建造（Build in Public）：把开发经历拍成短视频，作品本身就是最好的自我介绍',
          en: 'Build in public: your shipped work is the most compelling introduction you will ever need',
        },
      ],
    },
  ] as NoteItem[],

  /** 留言墙默认欢迎留言（访客提交的新留言会保存在本地并排在最前面） */
  initialMessages: [
    {
      id: 'msg-welcome-1',
      name: '千川投放老王',
      topic: '项目交流',
      content: '用了你的 ROI 实时监控插件，企业微信推送超稳！主页质感太顶了，很有苹果官网那味儿。',
      createdAt: '2026-11-26',
    },
    {
      id: 'msg-welcome-2',
      name: '抖音刷过来的同学',
      topic: 'AI 合作',
      content: '刚看完你分享用 AI 做工具的视频顺着链接摸过来，期待自动上架工具早日上线！',
      createdAt: '2026-11-25',
    },
  ] as GuestMessage[],
};

/** 界面双语通用文案 */
export const UI_TEXT = {
  nav: {
    overview: { zh: '概览', en: 'Overview' },
    projects: { zh: '作品', en: 'Projects' },
    notes: { zh: '手记', en: 'Notes' },
    contact: { zh: '联系 & 留言', en: 'Contact' },
  },
  hero: {
    ctaProjects: { zh: '探索我的作品', en: 'Explore Work' },
    ctaContact: { zh: '联系 / 留言', en: 'Say Hello' },
    localTimeLabel: { zh: '实时创作中', en: 'Local Time' },
    shippedLabel: { zh: '核心项目方向', en: 'Active Tracks' },
    skillsTitle: { zh: '能力与标签', en: 'Core Craft' },
    socialTitle: { zh: '找到我', en: 'Find Me' },
    douyinDesc: { zh: '分享 AI 实战与开发经历', en: 'AI build stories & MVs' },
    wechatDesc: { zh: '朋友圈日常 · 点击复制/扫码', en: 'Click to copy or scan QR' },
  },
  projects: {
    eyebrow: { zh: 'PORTFOLIO · 精选作品', en: 'PORTFOLIO' },
    heading: { zh: '从灵感到上线，每一个都能真用。', en: 'Crafted from ideas, built to ship.' },
    subheading: {
      zh: '横跨电商效率插件、AI 视听创作与自动化工作流。点击任意卡片查看开发背景与核心细节。',
      en: 'Spanning browser extensions, AI audio-visual works, and automation pipelines. Click any card for the full story.',
    },
    filters: {
      all: { zh: '全部作品', en: 'All' },
      tool: { zh: '效率插件', en: 'Extensions' },
      creative: { zh: 'AI 音乐 MV', en: 'AI Music & MV' },
      automation: { zh: '自动化 & 实验', en: 'Automation & Lab' },
    },
    status: {
      live: { zh: '已上线', en: 'Live' },
      building: { zh: '开发中', en: 'Building' },
      exploring: { zh: '孵化中', en: 'Exploring' },
    },
    viewDetail: { zh: '查看详情', en: 'Details' },
    modalStory: { zh: '背后的开发故事', en: 'Behind the Build' },
    modalHighlights: { zh: '核心亮点', en: 'Key Highlights' },
  },
  notes: {
    eyebrow: { zh: 'JOURNAL · 实战手记', en: 'BUILD LOGS & NOTES' },
    heading: { zh: '记录用 AI 创造的前后经历。', en: 'Notes from building in public.' },
    subheading: {
      zh: '同步发在抖音和朋友圈的深度思考、踩坑复盘与创作工作流，点开即可沉浸阅读。',
      en: 'Deep-dive build logs, lessons learned, and AI workflows behind my Douyin and social posts.',
    },
    readMore: { zh: '阅读全文', en: 'Read Note' },
    takeaways: { zh: '核心要点', en: 'Key Takeaways' },
    copyShare: { zh: '复制分享文案', en: 'Copy Share Snippet' },
    copiedShare: { zh: '已复制分享文案，可直接发朋友圈 / 抖音', en: 'Share snippet copied!' },
  },
  contact: {
    eyebrow: { zh: 'CONNECT · 联系与留言', en: 'CONNECT & MESSAGE BOARD' },
    heading: { zh: '有想法、想交流，随时找我聊聊。', en: 'Got an idea? Let’s talk.' },
    subheading: {
      zh: '无论你是从 ROI 监控插件点进来，还是刷到抖音/朋友圈过来，都可以直接加我联系方式或在留言面板留下一句话。',
      en: 'Whether you found me via the ROI monitor extension or Douyin, feel free to reach out directly or leave a note below.',
    },
    directTitle: { zh: '快捷联系面板', en: 'Direct Channels' },
    copyWechat: { zh: '复制微信号', en: 'Copy WeChat' },
    showQr: { zh: '微信扫码', en: 'WeChat QR' },
    openDouyin: { zh: '打开抖音', en: 'Open Douyin' },
    copyEmail: { zh: '复制邮箱', en: 'Copy Email' },
    boardTitle: { zh: '给我留言', en: 'Leave a Message' },
    boardSub: {
      zh: '聊项目、提插件需求、约 AI 合作，或单纯打个招呼。',
      en: 'Ask about a tool, propose an AI collab, or just say hi.',
    },
    topics: {
      zh: ['项目交流', '插件需求', 'AI 合作', '随便聊聊'],
      en: ['Project Chat', 'Plugin Request', 'AI Collab', 'Just Saying Hi'],
    },
    namePlaceholder: { zh: '你的称呼（必填）', en: 'Your name (required)' },
    contactPlaceholder: { zh: '微信 / 邮箱（选填，方便我回复你）', en: 'WeChat / Email (optional)' },
    messagePlaceholder: {
      zh: '写下你想交流的想法、需求或反馈...',
      en: 'Share your thoughts, feedback, or collaboration idea...',
    },
    submit: { zh: '发送留言', en: 'Send Message' },
    recentMessages: { zh: '最近留言', en: 'Recent Notes' },
    qrModalTitle: { zh: '添加我的微信', en: 'Connect on WeChat' },
    qrModalHint: {
      zh: '将你的微信二维码图片放到 public/wechat-qr.png 并在 src/data/profile.ts 填入路径后，这里将自动显示真实二维码。',
      en: 'Place your QR image at public/wechat-qr.png and set wechatQrUrl in src/data/profile.ts to display your real QR code here.',
    },
  },
  footer: {
    builtWith: {
      zh: '用心打磨每一个 Idea · 支持深浅色与中英双语切换',
      en: 'Crafted with obsession · Dark/Light & Bilingual Ready',
    },
  },
};
