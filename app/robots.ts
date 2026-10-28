import type { MetadataRoute } from "next";
import { approvedSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const site = approvedSiteUrl();
  return site
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", site).href }
    : { rules: { userAgent: "*", disallow: "/" } };
}
