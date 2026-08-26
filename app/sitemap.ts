import type { MetadataRoute } from "next";

const BASE_URL = "https://ermiliweb.com";

const paths = ["", "/projects"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const en = `${BASE_URL}${path || "/"}`;
    const fr = `${BASE_URL}/fr${path || ""}`;

    return [
      {
        url: en,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en,
            fr,
            "x-default": en,
          },
        },
      },
      {
        url: fr,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en,
            fr,
            "x-default": en,
          },
        },
      },
    ];
  });
}
