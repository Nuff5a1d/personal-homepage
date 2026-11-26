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
2. **卡点 2：正在选购独立域名（待拍板下单）**
   - **核心关键词**：`kamisama`（卡密撒嘛）
   - **倾向注册商**：**Spaceship**（支持支付宝、免实名认证、免费 WHOIS 隐私保护、续费透明；不需要走 ICP 备案即可直接绑定海外托管）。
   - **已确认可注册 & 性价比候选**：
     - `kamisamalab.com`：首年 ~US$9.48，续费 ~US$10.68（综合最稳、最推荐）
     - `kamisamahub.com`：首年 ~US$9.48，续费 ~US$10.68
     - `kamisama.si`：首年 ~US$10.98，续费 ~US$11.98（纯单词短域名）
     - 待在 Spaceship 实时核查是否可注册：`kamisama.cc`（常规续费约 $8.26）、`kamisama.top`（常规续费约 $4.05）
   - **避坑记录**：
     - 已有注册不可买：`kamisama.com` / `.org` / `.ai` / `.net`
     - 严禁误买高价/高续费：`kamisama.inc`（续费 $2,059/年）、阿里云 `bukuishini.com`（一口价 ¥1,150）、`.studio`（续费 ~$41.6/年）
3. **卡点 3：旧电脑 Chrome 远程调试连接断开**
   - 旧电脑上 `DevToolsActivePort` 缺失导致内置浏览器未能自动查完 Spaceship 的剩余后缀，换新电脑后可直接继续查价或手动筛选。

---

## 四、新电脑接力待办（Next Steps）

1. **拉取仓库**：
   ```bash
   git clone https://github.com/Nuff5a1d/personal-homepage.git
   cd personal-homepage
   npm install
   ```
2. **确认并购买 `kamisama` 域名**：在 Spaceship 查完 `kamisama.cc` / `kamisama.top`（或直接买 `kamisamalab.com` / `kamisama.si`），**只买裸域名**，不勾附加主机/邮箱服务。
3. **部署上线并绑定域名（推荐 Cloudflare Pages）**：
   - 登录 Cloudflare Dashboard（邮箱注册即可）→ **Workers & Pages → Pages → Connect to Git** → 导入 `Nuff5a1d/personal-homepage`；
   - 构建配置：Framework 选 `Vite`（Build command: `npm run build`，Build output directory: `dist`）；
   - 在项目 **Custom domains** 绑定刚买好的独立域名，按提示在 Spaceship 配置 DNS（或直接将 Nameservers 托管到 Cloudflare），等待自动签发 HTTPS 证书。
   - *（备选：也可直接在 GitHub 仓库 `Settings → Pages` 把 Source 设为 `GitHub Actions` 先出 `https://nuff5a1d.github.io/personal-homepage/`）*
4. **上线后体验打磨（可选）**：
   - 将 `public/avatar.jpg`、`public/hero-bg.jpg`、`public/wechat-qr.jpg` 压缩为轻量 WebP，进一步提升国内手机 4G/5G 打开速度；
   - 在 `src/data/profile.ts` 补充真实抖音主页直链、AI 音乐 MV 作品链接、留言推送 `messageWebhookUrl`；
   - 拿到正式上线域名后，把个人主页入口链接加到 `qianchuan-roi-monitor` 插件面板里。

---

## 五、新电脑开对话可直接复制的开场白

> 我正在做个人主页项目，代码已经在 `https://github.com/Nuff5a1d/personal-homepage`。请先阅读仓库根目录的 `HANDOFF.md`，了解我们目前的进度和卡点，然后接着帮我完成「选定/购买 `kamisama` 域名 → 部署到 Cloudflare Pages 并绑定自定义域名上线」。
