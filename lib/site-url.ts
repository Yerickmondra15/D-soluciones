function httpsOrigin(value: string | undefined): URL | undefined {
  try {
    if (!value) return;
    const url = new URL(value);
    if (url.protocol !== "https:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname)) return;
    return new URL(url.origin);
  } catch { return; }
}

export function approvedSiteUrl(): URL | undefined {
  return httpsOrigin(process.env.SITE_URL);
}

export function metadataBaseUrl(): URL | undefined {
  const approved = approvedSiteUrl();
  if (approved || process.env.NETLIFY !== "true") return approved;
  return httpsOrigin(process.env.DEPLOY_PRIME_URL)
    || httpsOrigin(process.env.URL)
    || httpsOrigin(process.env.DEPLOY_URL);
}
