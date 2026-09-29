import type { MetadataRoute } from "next";

import { getFleet } from "@/lib/data/fleet";
import { siteUrl } from "@/lib/site";


export default function sitemap(): MetadataRoute.Sitemap {
  const vehicleRoutes: MetadataRoute.Sitemap = getFleet().map((vehicle) => ({
    url: `${siteUrl}/frota/${vehicle.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/frota`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...["/ajuda", "/privacidade", "/termos"].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...vehicleRoutes,
  ];
}
