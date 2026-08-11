// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://wyckoffconsulting.com',

  redirects: {
    '/blog-no-sidebar': '/insights',
    '/blog-no-sidebar/page/2': '/insights',
    '/sales-and-marketing/digital-strategies-for-eos-driven-companies': '/insights/digital-strategies-for-eos-driven-companies',
    '/insight/how-does-social-media-affect-mental-health': '/insights/how-does-social-media-affect-mental-health',
    '/uncategorized/the-value-of-the-metaverse': '/insights/the-value-of-the-metaverse',
    '/uncategorized/recessionary-times-are-altering-the-course-of-2022s-great-resignation': '/insights/recessionary-times-are-altering-the-course-of-2022s-great-resignation',
    '/uncategorized/how-the-metaverse-will-impact-social-media': '/insights/how-the-metaverse-will-impact-social-media',
    '/sales-and-marketing/prepare-for-google-multisearch': '/insights/prepare-for-google-multisearch',
    '/uncategorized/5-marketing-metrics-that-eos-driven-companies-must-measure': '/insights/5-marketing-metrics-that-eos-driven-companies-must-measure',
    '/sales-and-marketing/geotargeting-will-change-over-the-next-three-years': '/insights/geotargeting-will-change-over-the-next-three-years',
    '/uncategorized/the-cost-of-silence': '/insights/the-cost-of-silence',
    '/gratitude/5-for-5-the-5-life-lessons-learned-in-5-years-of-sobriety': '/insights/5-for-5-the-5-life-lessons-learned-in-5-years-of-sobriety',
    '/insight/need-a-lyft-before-starting-2021-try-gratitude': '/insights/need-a-lyft-before-starting-2021-try-gratitude',
    '/sales-and-marketing/the-lost-art-of-the-follow-up': '/insights/the-lost-art-of-the-follow-up',
    '/photography/trained-in-tragedy-a-photographers-journey-back': '/insights/trained-in-tragedy-a-photographers-journey-back',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
