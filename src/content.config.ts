import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const insights = defineCollection({
  loader: glob({
    base: "./src/content/insights",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().min(1),
    featuredImageAlt: z.string().default(""),
    featuredImageWidth: z.number().int().positive(),
    featuredImageHeight: z.number().int().positive(),
    legacyId: z.number().int().positive(),
    legacyPath: z.string().min(1),
    sourceUrl: z.url(),
    draft: z.boolean().default(false),
    featured: z.boolean().optional(),
  }),
});

export const collections = { insights };
