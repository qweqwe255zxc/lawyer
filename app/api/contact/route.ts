import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site.config";
import { palette } from "@/theme/palette";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Служебные поля — в письмо и телеграм не идут, это не то, что ввёл пользователь. */
const SERVICE_FIELDS = new Set(["_gotcha", "elapsed"]);

/**
 * Порог антибот-таймера — только серверная константа, значение клиента
 * не читаем: `payload.minFill` раньше приходил от клиента и сравнивался
 * с `payload.elapsed`, тоже от клиента — весь фильтр проходился одним
 * запросом вида `{elapsed: 999999, minFill: 0}`. Задержка та же, что и
 * на клиенте (components/sections/ContactForm/parts/useContactForm.ts,
 * MIN_FILL_MS) — держать в одном месте нельзя: серверный роут не должен
 * импортировать клиентский модуль ("use client"), значения синхронизируются
 * руками.
 */
const MIN_FILL_MS = 3000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);

  // чтобы карта не росла бесконечно, время от времени подчищаю пустые записи
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function labelFor(name: string): string {
  const contactSection = siteConfig.sections.find(
    (section) => section.type === "contact",
  );
  if (contactSection && contactSection.type === "contact") {
    const field = contactSection.fields.find((item) => item.name === name);
    if (field) return field.label;
  }
  return name;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram ${response.status}: ${await response.text()}`);
  }
  return true;
}

async function sendEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !to || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject,
      html,
      reply_to: process.env.MAIL_REPLY_TO || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // антиспам: в обоих случаях отвечаю 200 — если бот поймёт, что его
  // отсеяли, начнёт подбирать обход. Живой пользователь сюда не попадает.
  // console.log — не для отладки, а чтобы skip не был полностью немым:
  // без него ложное срабатывание на живом после автозаполнении браузера
  // выглядело бы как «заявка ушла», а на деле нигде не появилась бы.
  if (typeof payload._gotcha === "string" && payload._gotcha.trim() !== "") {
    console.log(`[contact] отсеяно honeypot, ip=${ip}`);
    return NextResponse.json({ ok: true, skipped: "honeypot" });
  }

  const elapsed = Number(payload.elapsed ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.log(`[contact] отсеяно по таймеру (elapsed=${elapsed}), ip=${ip}`);
    return NextResponse.json({ ok: true, skipped: "too_fast" });
  }

  const entries = Object.entries(payload)
    .filter(([key, value]) => !SERVICE_FIELDS.has(key) && typeof value === "string")
    .map(([key, value]) => [key, (value as string).trim()] as const)
    .filter(([, value]) => value !== "");

  const data = Object.fromEntries(entries);

  if (!data.name || !data.phone) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  const subject = `Заявка с сайта — ${siteConfig.brand.name}`;
  const lines = entries.map(([key, value]) => `${labelFor(key)}: ${value}`);

  const telegramText = [
    `<b>${escapeHtml(subject)}</b>`,
    "",
    ...lines.map((line) => escapeHtml(line)),
    "",
    new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
  ].join("\n");

  const emailHtml = [
    `<h2 style="font-family:Georgia,serif">${escapeHtml(subject)}</h2>`,
    "<table style=\"font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse\">",
    ...entries.map(
      ([key, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:${palette.inkMuted}">${escapeHtml(
          labelFor(key),
        )}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    ),
    "</table>",
  ].join("");

  const results = await Promise.allSettled([
    sendTelegram(telegramText),
    sendEmail(subject, emailHtml),
  ]);

  const delivered = results.some(
    (result) => result.status === "fulfilled" && result.value === true,
  );

  const failures = results.filter((result) => result.status === "rejected");
  failures.forEach((failure) => {
    console.error("[contact] канал доставки упал:", (failure as PromiseRejectedResult).reason);
  });

  // если env не настроены, заявка не теряется — просто падает в лог
  if (!delivered) {
    console.log(
      "[contact] Каналы доставки не настроены, заявка в лог:\n" +
        lines.join("\n"),
    );

    if (failures.length > 0) {
      return NextResponse.json(
        { ok: false, error: "delivery_failed" },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true, delivered });
}
