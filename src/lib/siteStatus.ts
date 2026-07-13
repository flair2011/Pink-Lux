import { BUSINESS_CONFIG } from "@/config/business";

type SiteStatus = "Active" | "Maintenance" | "Offline";

interface StatusResult {
  status: SiteStatus;
  message: string | null;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 3000;

let cached: { result: StatusResult; checkedAt: number } | null = null;

/**
 * Checks this site's suspension status with the agency CRM. Always fails
 * open (returns null, meaning "treat as Active") on missing config, timeout,
 * or any error — a CRM outage or misconfiguration must never take the site down.
 */
export async function checkSiteStatus(): Promise<StatusResult | null> {
  const apiKey = process.env.SITE_STATUS_API_KEY;
  const crmUrl = process.env.SITE_STATUS_CRM_URL;
  if (!apiKey || !crmUrl) {
    console.warn("[siteStatus] SITE_STATUS_API_KEY/SITE_STATUS_CRM_URL not set — skipping check, site stays Active.");
    return null;
  }

  if (cached && Date.now() - cached.checkedAt < CACHE_TTL_MS) {
    return cached.result;
  }

  const endpoint = `${crmUrl}/api/websites/status`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[siteStatus] ${endpoint} returned ${res.status} — failing open (site stays Active). Check SITE_STATUS_CRM_URL and SITE_STATUS_API_KEY.`);
      return cached?.result ?? null;
    }

    const data = await res.json();
    const result: StatusResult = { status: data.status, message: data.message ?? null };
    console.log(`[siteStatus] resolved status=${result.status} from ${endpoint}`);
    cached = { result, checkedAt: Date.now() };
    return result;
  } catch (err) {
    console.error(`[siteStatus] request to ${endpoint} failed — failing open (site stays Active).`, err);
    return cached?.result ?? null;
  }
}

export function buildMaintenanceResponseHtml({ status, message }: StatusResult): string {
  const title = status === "Maintenance" ? "Under Maintenance" : "Site Unavailable";
  const body = message || (status === "Maintenance"
    ? "We're making some improvements. Please check back soon."
    : "This site is temporarily unavailable. Please check back later.");
  const name = BUSINESS_CONFIG.NAME;
  const email = BUSINESS_CONFIG.SUPPORT_EMAIL;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — ${name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #FFF5F8;
    --card: #FFFFFF;
    --ink: #1A1A1A;
    --muted: #6B6B6B;
    --primary: #FF69B4;
    --primary-tint: #FCE4EC;
    --secondary: #D81B78;
    --shadow: rgba(216, 27, 120, 0.12);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0D0208;
      --card: #120510;
      --ink: #F5E6EF;
      --muted: #B3A0AA;
      --primary: #FF69B4;
      --primary-tint: #3D0A24;
      --secondary: #F06ABC;
      --shadow: rgba(0, 0, 0, 0.4);
    }
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;
    background: var(--bg);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--ink);
  }
  .card {
    width: 100%;
    max-width: 26rem;
    text-align: center;
    background: var(--card);
    border-radius: 20px;
    padding: 2.75rem 2.25rem;
    box-shadow: 0 24px 48px -12px var(--shadow);
  }
  .badge {
    width: 44px;
    height: 44px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    background: var(--primary-tint);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .badge::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary);
  }
  .eyebrow {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--secondary);
    margin: 0 0 0.6rem;
  }
  h1 {
    font-family: 'Noto Serif', serif;
    font-weight: 700;
    font-size: 1.625rem;
    line-height: 1.3;
    margin: 0 0 0.75rem;
    text-wrap: balance;
  }
  p.body {
    margin: 0;
    color: var(--muted);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
  .contact {
    margin: 1.75rem 0 0;
    font-size: 0.8125rem;
    color: var(--muted);
  }
  .contact a {
    color: var(--secondary);
    text-decoration: none;
    font-weight: 500;
  }
  .contact a:hover, .contact a:focus-visible {
    text-decoration: underline;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="badge"></div>
    <p class="eyebrow">${name}</p>
    <h1>${title}</h1>
    <p class="body">${body}</p>
    ${email ? `<p class="contact">Need to reach us? <a href="mailto:${email}">${email}</a></p>` : ""}
  </div>
</body>
</html>`;
}
