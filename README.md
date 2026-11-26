# 个人主页（Apple 质感 Bento Grid）

基于 **Vite + React + TypeScript + Tailwind CSS** 打造的综合型个人主页，采用对标 Apple / iPhone Pro 的钛金属深色与陶瓷浅色双主题设计，支持中英双语切换、移动端自适应、作品集交互展示、实战手记阅读弹窗与在线留言面板。

---

## 一、快速替换你的个人资料（2 分钟）

所有个人信息、项目、手记、微信号、抖音链接都集中在同一个文件里：

👉 **`src/data/profile.ts`**

你只需要修改里面的：
1. `name` / `handle` / `role` / `heroHeadline`：你的昵称、定位与个人 Slogan
2. `avatarUrl`：把头像图片放到 `public/avatar.jpg`，填 `'/avatar.jpg'`（留空则显示钛金属字母徽章）
3. `contact`：
   - `wechatId`：你的微信号
   - `wechatQrUrl`：把微信二维码放到 `public/wechat-qr.png`，填 `'/wechat-qr.png'`
   - `douyinName` / `douyinId` / `douyinUrl`：你的抖音主页信息
   - `email` / `githubUrl`：邮箱与 GitHub
   - `messageWebhookUrl`（可选）：填入 Formspree 或企业微信/飞书 Webhook，访客留言后自动推送通知
4. `projects` / `notes`：随时增删你的项目与开发复盘文章

---

## 二、本地预览与打包

```bash
# 安装依赖
npm install

# 启动本地开发预览
npm run dev

# 编译生产静态文件（输出到 dist/ 目录）
npm run build
```

---

## 三、免费上线部署 & 嵌入「千川 ROI 实时监控插件」

1. **推荐免费托管平台**：[Vercel](https://vercel.com/)、[Cloudflare Pages](https://pages.cloudflare.com/) 或 GitHub Pages。
   - 把 `personal-homepage` 推送到 GitHub 仓库后，导入 Vercel / Cloudflare Pages，框架自动识别为 Vite，一键生成全球加速的 HTTPS 链接（例如 `https://yourname.vercel.app`）。
2. **挂到抖音 / 朋友圈**：页面已针对手机端竖屏优化，直接发链接或生成短链/二维码即可打开。
3. **挂进「千川 ROI 实时监控告警」插件**：部署上线获得网址后，在 `qianchuan-roi-monitor/content.js` 的面板底部加一个 `<a>` 链接指向你的主页 URL，就能让每个使用插件的人一键进入你的个人名片。
