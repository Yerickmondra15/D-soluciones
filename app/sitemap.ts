import type { MetadataRoute } from "next";
import { approvedSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = approvedSiteUrl();
  return site ? ["/", "/productos"].map(path => ({ url: new URL(path, site).href })) : [];
}
