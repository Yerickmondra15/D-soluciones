export function approvedSiteUrl(): URL | undefined {
  try {
    if (!process.env.SITE_URL) return;
    const url = new URL(process.env.SITE_URL);
    if (url.protocol !== "https:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname)) return;
    return new URL(url.origin);
  } catch { return; }
}
