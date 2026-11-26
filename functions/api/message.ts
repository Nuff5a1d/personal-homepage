interface Env {
  /** 企业微信群机器人 Webhook（绑定个人微信后可直接在微信收消息） */
  WECOM_WEBHOOK_URL?: string;
  /** PushPlus Token（pushplus.plus 微信推送） */
  PUSHPLUS_TOKEN?: string;
  /** 飞书自定义机器人 Webhook（可选） */
  FEISHU_WEBHOOK_URL?: string;
  /** iOS Bark 推送地址前缀，如 https://api.day.app/你的Key（可选） */
  BARK_URL?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface IncomingMessage {
  name?: string;
  contact?: string;
  topic?: string;
  content?: string;
  createdAt?: string;
  botcheck?: string;
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function onRequestPost(context: PagesContext): Promise<Response> {
  try {
    const payload = (await context.request.json()) as IncomingMessage;

    // Honeypot anti-spam check
    if (payload.botcheck) {
      return jsonResponse({ ok: true, skipped: true });
    }

    const name = (payload.name || '').trim().slice(0, 60);
    const contact = (payload.contact || '').trim().slice(0, 100);
    const topic = (payload.topic || '主页留言').trim().slice(0, 40);
    const content = (payload.content || '').trim().slice(0, 600);

    if (!name || !content) {
      return jsonResponse({ ok: false, error: 'Missing required fields' }, 400);
    }

    const timeStr = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
    });
    const contactDisplay = contact || '未填写';

    const tasks: Array<{ channel: string; promise: Promise<Response> }> = [];

    // 1. 企业微信群机器人（个人微信直收）
    if (context.env.WECOM_WEBHOOK_URL) {
      const md = [
        `### 💌 kamisama.si 收到新留言`,
        `> **主题**：${topic}`,
        `> **称呼**：${name}`,
        `> **联系方式**：${contactDisplay}`,
        `> **时间**：${timeStr}`,
        ``,
        `**留言内容**：`,
        content,
      ].join('\n');

      tasks.push({
        channel: 'wecom',
        promise: fetch(context.env.WECOM_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            msgtype: 'markdown',
            markdown: { content: md },
          }),
        }),
      });
    }

    // 2. PushPlus（个人微信直收）
    if (context.env.PUSHPLUS_TOKEN) {
      const html = [
        `<p><strong>主题：</strong>${escapeHtml(topic)}</p>`,
        `<p><strong>称呼：</strong>${escapeHtml(name)}</p>`,
        `<p><strong>联系方式：</strong>${escapeHtml(contactDisplay)}</p>`,
        `<p><strong>时间：</strong>${escapeHtml(timeStr)}</p>`,
        `<hr />`,
        `<p>${escapeHtml(content).replace(/\n/g, '<br />')}</p>`,
      ].join('');

      tasks.push({
        channel: 'pushplus',
        promise: fetch('https://www.pushplus.plus/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: context.env.PUSHPLUS_TOKEN,
            title: `【kamisama.si 新留言】${topic} · ${name}`,
            content: html,
            template: 'html',
          }),
        }),
      });
    }

    // 3. 飞书自定义机器人（可选）
    if (context.env.FEISHU_WEBHOOK_URL) {
      const text = [
        `💌 kamisama.si 收到新留言`,
        `主题：${topic}`,
        `称呼：${name}`,
        `联系方式：${contactDisplay}`,
        `时间：${timeStr}`,
        `内容：${content}`,
      ].join('\n');

      tasks.push({
        channel: 'feishu',
        promise: fetch(context.env.FEISHU_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            msg_type: 'text',
            content: { text },
          }),
        }),
      });
    }

    // 4. Bark（iOS 推送，可选）
    if (context.env.BARK_URL) {
      const base = context.env.BARK_URL.replace(/\/+$/, '');
      tasks.push({
        channel: 'bark',
        promise: fetch(base, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `kamisama.si 新留言 · ${name}`,
            body: `[${topic}] ${content}\n联系: ${contactDisplay}`,
            group: 'kamisama.si',
          }),
        }),
      });
    }

    if (tasks.length === 0) {
      return jsonResponse({ ok: true, delivered: [], note: 'No push channel configured yet' });
    }

    const settled = await Promise.allSettled(tasks.map((t) => t.promise));
    const delivered: string[] = [];
    const failed: string[] = [];

    settled.forEach((res, idx) => {
      const ch = tasks[idx].channel;
      if (res.status === 'fulfilled' && res.value.ok) {
        delivered.push(ch);
      } else {
        failed.push(ch);
      }
    });

    return jsonResponse({ ok: delivered.length > 0, delivered, failed });
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid request' }, 400);
  }
}
