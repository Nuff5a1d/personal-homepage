# 项目交接与进度同步（HANDOFF）

> 本文件用于跨设备无缝继续开发与上线。换电脑后只需拉取本仓库并让 AI 读取本文件，即可直接从当前节点往下推进。

---

## 一、项目概览

- **项目名称**：步奎矢溺 · 故障浪漫主页（`personal-homepage`）
- **GitHub 仓库**：`https://github.com/Nuff5a1d/personal-homepage`（主分支 `main`）
- **技术栈**：Vite 6 + React 19 + TypeScript + Tailwind CSS 3 + Lucide React
- **本地命令**：`npm install` / `npm run dev` / `npm run build`（最近一次构建 `tsc -b && vite build` 0 报错通过）
- **核心目标**：打造 Apple / iPhone Pro 质感的个人主页，用于抖音/朋友圈分享引流，并最终把上线链接嵌入作者的「千川 ROI 实时监控告警」Chrome 插件中。

---

## 二、已完成事项

1. **视觉与响应式架构**
   - 采用 Apple 质感 Bento Grid 布局，支持**钛金属深色 / 陶瓷浅色**一键切换、**中英双语**切换。
   - 已重构为宽屏自适应铺开（`max-w-[1800px]`），宽屏下精选作品自动 4 列横排，大幅精简了冗余徽章与重复模块。
2. **个人资料与静态资源已就位**（统一在 `src/data/profile.ts` 管理）
   - 昵称 / 定位：`步奎矢溺`（`@OliverRockwell`） / `故障浪漫主页`
   - 主标语：`一句话太短了，介绍不完。`
   - 联系方式：微信 `OliverRockwell`、邮箱 `shuorockwell@gmail.com`、GitHub `https://github.com/Nuff5a1d`
   - 已导入图片资源：
     - `public/avatar.jpg`：用户真实头像（大千世界），用于顶栏与首屏名片
     - `public/hero-bg.jpg`：定制生成的 Apple 拉丝钛金属 × 琉璃光影背景图，用于首屏右侧时钟卡片（已适配深浅双模式）
     - `public/wechat-qr.jpg`：用户真实微信二维码，直接展示在联系卡片并支持点击放大弹窗
3. **功能模块**
   - **精选作品集**（`src/components/ProjectsSection.tsx`）：支持分类筛选与详情弹窗；主打项目已接入真实插件仓库 `https://github.com/Nuff5a1d/qianchuan-roi-monitor` 及动态模拟 ROI 监控预览卡，同时预置了 AI 音乐 MV、电商自动上架（开发中）、Idea Lab。
   - **实战手记**（`src/components/NotesSection.tsx`）：支持沉浸阅读弹窗与一键复制朋友圈/抖音分享文案。
   - **联系与留言板**（`src/components/ContactSection.tsx`）：微信扫码/一键复制 + 本地 `localStorage` 持久化留言墙（`src/data/profile.ts` 中已预留 `messageWebhookUrl` 可接入企微/飞书/Formspree 推送）。
4. **代码与 CI 已同步到 GitHub**
   - 全部源码、静态图片与 `.github/workflows/deploy.yml`（GitHub Pages 自动部署脚本）均已推送至 `origin/main`。

---

## 三、当前进度与卡点（Blockers）

1. **卡点 1：Vercel 注册收不到国内短信验证码（已放弃 Vercel）**
   - 尝试通过 GitHub 登录 Vercel 时，中国电信 `+86` 号段无法收到 SMS 验证码。
   - **结论**：改用 **Cloudflare Pages**（仅需邮箱、免手机验证、免费不限流量、绑独立域名后国内打开较稳）或 **GitHub Pages**（零注册直接启用）。
2. **卡点 2：独立域名已选定并购买完成（✅ 已解决）**
   - **正式域名**：`https://kamisama.si`（已在 **Spaceship** 购入裸域名，免费 WHOIS 隐私保护、免 ICP 备案）。
   - **上线前代码优化已完成**：
     - [index.html](index.html) 已补充 `https://kamisama.si/` 的 `canonical` 与 Open Graph / Twitter 分享卡片元信息（便于微信/朋友圈分享展示）；
     - `public/` 图片已优化为轻量 WebP（`avatar.webp` 34 KB、`hero-bg.webp` 41 KB、`wechat-qr.webp` 47 KB，保留 `avatar.jpg` 43 KB 供微信分享卡片抓取），总图片体积从 1.07 MB 降至 ~122 KB。
3. **当前待办（仅剩 Cloudflare Pages 绑定上线）**
   - 登录 Cloudflare Dashboard（邮箱注册即可）→ **Workers & Pages → Pages → Import an existing Git repository** → 导入 `Nuff5a1d/personal-homepage`（`Vite` / `npm run build` / `dist`）；
   - 在 Cloudflare 首页添加域名 `kamisama.si`（选 **Free $0**），把 Cloudflare 给的 2 条 Nameservers 填到 Spaceship `kamisama.si` 的 Custom nameservers；
   - 在 Pages 项目的 **Custom domains** 绑定 `kamisama.si`（及可选 `www.kamisama.si`），等待自动签发 HTTPS 证书生效。

---

## 四、后续待办（上线后可选）

1. 在 `src/data/profile.ts` 补充真实抖音主页直链、AI 音乐 MV 作品链接、留言推送 `messageWebhookUrl`；
2. 确认 `https://kamisama.si` 正常打开后，把个人主页入口链接加到 `qianchuan-roi-monitor` 插件面板里。

---

## 五、新电脑开对话可直接复制的开场白

> 我正在做个人主页项目，代码已经在 `https://github.com/Nuff5a1d/personal-homepage`。请先阅读仓库根目录的 `HANDOFF.md`，了解我们目前的进度和卡点，然后接着帮我完成「选定/购买 `kamisama` 域名 → 部署到 Cloudflare Pages 并绑定自定义域名上线」。
