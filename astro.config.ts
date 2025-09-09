import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

// Import KaTex rendering
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG,
  GISCUS_POSITION,
  GISCUS_THEME,
  GISCUS_LAZY
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://vallev.me',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
    spectre({
      name: 'Vaughn Valle',
      openGraph: {
        home: {
          title: 'Vaughn Valle',
          description: 'Vaughn\'s personal website'
        },
        blog: {
          title: 'Blog',
          description: 'My personal loci'
        },
        projects: {
          title: 'Projects'
        }
      },
      giscus: {
        repository: GISCUS_REPO,
        repositoryId: GISCUS_REPO_ID,
        category: GISCUS_CATEGORY,
        categoryId: GISCUS_CATEGORY_ID,
        mapping: GISCUS_MAPPING as any,
        strict: GISCUS_STRICT === "true",
        reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
        emitMetadata: GISCUS_EMIT_METADATA === "true",
        lang: GISCUS_LANG,
        commentsInput: GISCUS_POSITION,
        theme: GISCUS_THEME,
        loading: GISCUS_LAZY === "true",

      }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});

export default config;
