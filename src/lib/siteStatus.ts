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

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — ${BUSINESS_CONFIG.NAME}</title>
<style>
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fafafa; color: #1a1a1a; text-align: center; padding: 4rem 1.5rem; }
  h1 { font-family: 'Noto Serif', serif; font-size: 1.75rem; margin-bottom: 0.75rem; }
  p { color: #555; max-width: 32rem; margin: 0 auto; }
</style>
</head>
<body>
  <h1>${title}</h1>
  <p>${body}</p>
</body>
</html>`;
}
