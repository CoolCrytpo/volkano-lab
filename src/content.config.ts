import { defineCollection, z } from 'astro:content';

// Collection "tools" — fichiers JSON dans src/content/tools/
const tools = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional().nullable(),
    category: z.enum(['gratuit', 'premium', 'services']),
    subcategory: z.string(),
    tags: z.array(z.string()).default([]),
    premium: z.boolean().default(false),
    priceFiat: z.number().optional().nullable(),
    priceCrypto: z.string().optional().nullable(),
    stripeProductId: z.string().optional().nullable(),
    downloadUrl: z.string().optional().nullable(),
    content: z.any().optional(),
  }),
});

export const collections = { tools };
