#!/usr/bin/env node

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as parse5 from 'parse5';
import sharp from 'sharp';

const EXPECTED_POST_COUNT = 13;
const API_URL =
  'https://wyckoffconsulting.com/wp-json/wp/v2/posts?per_page=100&_embed=1';
const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content/insights');
const IMAGE_DIR = path.join(PROJECT_ROOT, 'public/images/insights');
const LEGACY_POST_PATHS = new Set([
  '/sales-and-marketing/digital-strategies-for-eos-driven-companies/',
  '/insight/how-does-social-media-affect-mental-health/',
  '/uncategorized/the-value-of-the-metaverse/',
  '/uncategorized/recessionary-times-are-altering-the-course-of-2022s-great-resignation/',
  '/uncategorized/how-the-metaverse-will-impact-social-media/',
  '/sales-and-marketing/prepare-for-google-multisearch/',
  '/uncategorized/5-marketing-metrics-that-eos-driven-companies-must-measure/',
  '/sales-and-marketing/geotargeting-will-change-over-the-next-three-years/',
  '/uncategorized/the-cost-of-silence/',
  '/gratitude/5-for-5-the-5-life-lessons-learned-in-5-years-of-sobriety/',
  '/insight/need-a-lyft-before-starting-2021-try-gratitude/',
  '/sales-and-marketing/the-lost-art-of-the-follow-up/',
  '/photography/trained-in-tragedy-a-photographers-journey-back/',
]);

// The legacy media library has no alt text. These descriptions are intentionally
// centralized so they can be audited against the downloaded originals.
const FEATURED_ALT_BY_SLUG = {
  'digital-strategies-for-eos-driven-companies':
    'Overhead view of laptops, notebooks, phones, and coffee on a shared worktable',
  'how-does-social-media-affect-mental-health':
    'A young woman looks down as four peers crowd around her with smartphones',
  'the-value-of-the-metaverse':
    'A person wearing a virtual-reality headset beside a glowing digital globe',
  'recessionary-times-are-altering-the-course-of-2022s-great-resignation':
    'A smiling job candidate speaks with an interviewer across an office table',
  'how-the-metaverse-will-impact-social-media':
    'A woman in a virtual-reality headset reaches toward a networked digital globe',
  'prepare-for-google-multisearch':
    'Google’s search page displayed on a Samsung smartphone',
  '5-marketing-metrics-that-eos-driven-companies-must-measure':
    'A man reviews marketing strategy charts and notes arranged across a wall',
  'geotargeting-will-change-over-the-next-three-years':
    'Golden location pins placed across an illuminated city skyline at dusk',
  'the-cost-of-silence':
    'Black-and-white close-up of a woman holding a finger to her lips',
  '5-for-5-the-5-life-lessons-learned-in-5-years-of-sobriety':
    'Luke Wyckoff beside the words “5 Years Sober”',
  'need-a-lyft-before-starting-2021-try-gratitude':
    'A young child works the handle of an outdoor water pump beside a yellow water container',
  'the-lost-art-of-the-follow-up':
    'A black Bakelite rotary telephone on a wooden surface',
  'trained-in-tragedy-a-photographers-journey-back':
    'Black-and-white portrait of a young man with white pigment across his face',
};

const INLINE_ALT_BY_FILENAME = {
  'travel-pro-photos-15': 'A guitarist spreads his arms beneath colorful stage lights and smoke',
  'rodeo-blog': 'A cowboy wrestles a charging bull in a dirt rodeo arena',
  'travel-pro-photos-91': 'A rugby player carrying the ball drives forward through several tacklers',
  'travel-pro-photos-68':
    'A baseball runner slides toward home plate as the catcher reaches for the tag',
  'travel-pro-photos-56': 'Close-up of a mud-covered water buffalo',
  'travel-pro-photos-62': 'Fireworks burst above a packed stadium at dusk',
  'indo-blog': 'A performer in an ornate gold headdress peers over a patterned fan',
  'luke-blog-hero': 'A fisher casts a large net into the sea at sunset',
  'phone-old-year-built-1955-bakelite-163007':
    'A black Bakelite rotary telephone on a wooden surface',
};

function getAttribute(node, name) {
  return node.attrs?.find((attribute) => attribute.name === name)?.value ?? '';
}

function nodeText(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(nodeText).join('');
}

function normalizeInlineWhitespace(value) {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ');
}

function normalizeOutput(markdown) {
  return markdown
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function escapeMarkdownText(value) {
  return normalizeInlineWhitespace(value).replace(/([\\`])/g, '\\$1');
}

function escapeLinkDestination(value) {
  return value.replace(/ /g, '%20').replace(/\)/g, '\\)');
}

function escapeHtmlAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeLinkDestination(value) {
  const href = value.trim();
  if (!href) return '';
  if (href.startsWith('#') || href.startsWith('/')) return href;
  if (/^(?:mailto|tel):/i.test(href)) return href;

  let url;
  try {
    url = new URL(href);
  } catch {
    return '';
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';

  if (url.hostname === 'wyckoffconsulting.com' || url.hostname === 'www.wyckoffconsulting.com') {
    if (url.pathname === '/contact-layout-2/' || url.pathname === '/contact-layout-2') {
      return '/#contact';
    }
    if (LEGACY_POST_PATHS.has(url.pathname)) {
      const slug = url.pathname.split('/').filter(Boolean).at(-1);
      return `/insights/${slug}/`;
    }
    return `${url.pathname}${url.search}${url.hash}` || '/';
  }

  // This legacy HTTP destination has a working HTTPS endpoint.
  if (url.hostname === 'villageofsheridan.com') url.protocol = 'https:';
  return url.href;
}

function filenameKey(url) {
  const pathname = new URL(url).pathname;
  return path
    .basename(pathname, path.extname(pathname))
    .replace(/-\d+x\d+$/, '')
    .toLowerCase();
}

function originalWordPressImageUrl(source) {
  const url = new URL(source);
  url.pathname = url.pathname.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '');
  url.search = '';
  url.hash = '';
  return url.href;
}

function renderInline(node, context) {
  if (node.nodeName === '#text') return escapeMarkdownText(node.value ?? '');
  if (node.nodeName === '#comment') return '';

  const tag = node.tagName;
  const children = () => renderInlineChildren(node.childNodes ?? [], context);

  if (tag === 'br') return '  \n';
  if (tag === 'strong' || tag === 'b') {
    const value = children().trim();
    return value ? `**${value}**` : '';
  }
  if (tag === 'em' || tag === 'i') {
    const value = children().trim();
    return value ? `*${value}*` : '';
  }
  if (tag === 'a') {
    const sourceHref = getAttribute(node, 'href').trim();
    const href = normalizeLinkDestination(sourceHref);
    let label = children().trim() || sourceHref;
    // The legacy site sometimes links an image to its original file. The local
    // optimized image is already the intended full-size web asset.
    if (label.startsWith('<img ')) return label;
    // Repair a malformed visible URL in the legacy Five for Five article.
    if (sourceHref.startsWith('https://') && label === sourceHref.slice(1)) label = sourceHref;
    if (!href) return label;
    return `[${label}](${escapeLinkDestination(href)})`;
  }
  if (tag === 'img') {
    const source = getAttribute(node, 'src');
    const normalizedSource = originalWordPressImageUrl(source);
    const local = context.imageMap.get(normalizedSource);
    if (!local) throw new Error(`No local image mapping for ${source}`);
    const legacyAlt = normalizeInlineWhitespace(getAttribute(node, 'alt')).trim();
    const alt = legacyAlt || context.altMap.get(normalizedSource);
    if (!alt) throw new Error(`No authored alt text for ${source}`);
    return `<img src="${escapeHtmlAttribute(local)}" alt="${escapeHtmlAttribute(alt)}" loading="lazy" decoding="async" />`;
  }

  return children();
}

function renderInlineChildren(nodes, context) {
  return nodes
    .map((node, index) => {
      let rendered = renderInline(node, context);
      if (node.tagName !== 'strong' && node.tagName !== 'b' && node.tagName !== 'em' && node.tagName !== 'i') {
        return rendered;
      }

      // Several legacy posts omit literal spaces directly around emphasis tags
      // (for example, "<strong>end</strong>of"). Browsers preserve that typo;
      // Markdown makes it more conspicuous, so restore the implied word boundary.
      const previousText = index > 0 ? nodeText(nodes[index - 1]) : '';
      const nextText = index < nodes.length - 1 ? nodeText(nodes[index + 1]) : '';
      if (/\p{L}|\p{N}/u.test(previousText.at(-1) ?? '') && !/^\s/.test(rendered)) rendered = ` ${rendered}`;
      if (/^[\p{L}\p{N}]/u.test(nextText) && !/\s$/.test(rendered)) rendered = `${rendered} `;
      return rendered;
    })
    .join('');
}

function renderList(node, context, depth = 0) {
  const lines = [];
  for (const item of node.childNodes ?? []) {
    if (item.tagName !== 'li') continue;
    const inlineChildren = [];
    const nestedLists = [];
    for (const child of item.childNodes ?? []) {
      if (child.tagName === 'ul' || child.tagName === 'ol') nestedLists.push(child);
      else inlineChildren.push(child);
    }

    const label = normalizeOutput(
      renderInlineChildren(inlineChildren, context),
    ).replace(/\n+/g, ' ');
    const marker = node.tagName === 'ol' ? '1.' : '-';
    lines.push(`${'  '.repeat(depth)}${marker} ${label}`.trimEnd());
    for (const nested of nestedLists) lines.push(renderList(nested, context, depth + 1));
  }
  return lines.filter(Boolean).join('\n');
}

function renderBlock(node, context) {
  if (node.nodeName === '#text') {
    const value = normalizeInlineWhitespace(node.value ?? '').trim();
    return value ? `${escapeMarkdownText(value)}\n\n` : '';
  }
  if (node.nodeName === '#comment') return '';

  const tag = node.tagName;
  const blockChildren = () => (node.childNodes ?? []).map((child) => renderBlock(child, context)).join('');

  if (tag === 'p') {
    const value = renderInlineChildren(node.childNodes ?? [], context).trim();
    return value ? `${value}\n\n` : '';
  }
  if (/^h[1-6]$/.test(tag)) {
    const sourceLevel = Number(tag.slice(1));
    const level = sourceLevel === 1 ? 2 : sourceLevel;
    const label = normalizeInlineWhitespace(nodeText(node)).trim();
    return label ? `${'#'.repeat(level)} ${escapeMarkdownText(label)}\n\n` : '';
  }
  if (tag === 'ul' || tag === 'ol') {
    const value = renderList(node, context);
    return value ? `${value}\n\n` : '';
  }
  if (tag === 'figure') {
    const media = (node.childNodes ?? [])
      .filter((child) => child.tagName !== 'figcaption')
      .map((child) => renderBlock(child, context) || renderInline(child, context))
      .join('');
    const captionNode = (node.childNodes ?? []).find((child) => child.tagName === 'figcaption');
    const caption = captionNode ? normalizeInlineWhitespace(nodeText(captionNode)).trim() : '';
    return `${media}${caption ? `*${escapeMarkdownText(caption)}*\n\n` : ''}`;
  }
  if (tag === 'img') return `${renderInline(node, context)}\n\n`;
  if (tag === 'blockquote') {
    const value = normalizeOutput(blockChildren());
    return value ? `${value.split('\n').map((line) => `> ${line}`).join('\n')}\n\n` : '';
  }
  if (tag === 'a' || tag === 'strong' || tag === 'em' || tag === 'span') {
    const value = renderInline(node, context).trim();
    return value ? `${value}\n\n` : '';
  }

  return blockChildren();
}

function comparableHeading(value) {
  return normalizeInlineWhitespace(value)
    .toLocaleLowerCase('en-US')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function htmlToMarkdown(html, context, title) {
  const fragment = parse5.parseFragment(html);
  const markdown = normalizeOutput(
    (fragment.childNodes ?? []).map((node) => renderBlock(node, context)).join(''),
  );
  const lines = markdown.split('\n');
  const firstContentLine = lines.findIndex((line) => line.trim());
  if (firstContentLine >= 0) {
    const heading = lines[firstContentLine].match(/^##\s+(.+)$/);
    if (heading && comparableHeading(heading[1]) === comparableHeading(title)) {
      lines.splice(firstContentLine, 1);
      if (lines[firstContentLine]?.trim() === '') lines.splice(firstContentLine, 1);
    }
  }
  return normalizeOutput(lines.join('\n'));
}

function firstParagraph(html, title) {
  const fragment = parse5.parseFragment(html);
  const queue = [...(fragment.childNodes ?? [])];
  while (queue.length) {
    const node = queue.shift();
    if (node.tagName === 'p') {
      const text = normalizeInlineWhitespace(nodeText(node)).trim();
      if (text && comparableHeading(text) !== comparableHeading(title)) return text;
    }
    queue.unshift(...(node.childNodes ?? []));
  }
  return normalizeInlineWhitespace(nodeText(fragment)).trim();
}

function truncateAtWord(value, maximum = 220) {
  if (value.length <= maximum) return value;
  const shortened = value.slice(0, maximum + 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > maximum * 0.7 ? lastSpace : maximum).trim()}…`;
}

function extractTerms(post, taxonomy) {
  return (post._embedded?.['wp:term'] ?? [])
    .flat()
    .filter((term) => term.taxonomy === taxonomy)
    .map((term) => term.name);
}

function yamlArray(name, values) {
  if (!values.length) return `${name}: []`;
  return `${name}:\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}`;
}

function postTitle(post) {
  return normalizeInlineWhitespace(nodeText(parse5.parseFragment(post.title.rendered))).trim();
}

function frontmatter(post, media) {
  const title = postTitle(post);
  const description = truncateAtWord(firstParagraph(post.content.rendered, title));
  const sourceUrl = post.link;
  const legacyPath = new URL(sourceUrl).pathname;
  const categories = extractTerms(post, 'category');
  const tags = extractTerms(post, 'post_tag');

  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description.replace(/\+\s*Read More\s*$/i, '').trim())}`,
    `publishedAt: ${JSON.stringify(post.date.slice(0, 10))}`,
    `updatedAt: ${JSON.stringify(post.modified.slice(0, 10))}`,
    `author: ${JSON.stringify(post._embedded?.author?.[0]?.name ?? 'admin')}`,
    yamlArray('categories', categories),
    yamlArray('tags', tags),
    `featuredImage: ${JSON.stringify(media.publicPath)}`,
    `featuredImageAlt: ${JSON.stringify(FEATURED_ALT_BY_SLUG[post.slug])}`,
    `featuredImageWidth: ${media.width}`,
    `featuredImageHeight: ${media.height}`,
    `legacyId: ${post.id}`,
    `legacyPath: ${JSON.stringify(legacyPath)}`,
    `sourceUrl: ${JSON.stringify(sourceUrl)}`,
    'draft: false',
    '---',
  ].join('\n');
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Wyckoff-Insights-Importer/1.0' } });
  if (!response.ok) throw new Error(`Request failed (${response.status}): ${url}`);
  return response.json();
}

async function downloadAndOptimize(sourceUrl, outputPath, maximumWidth = 1600) {
  const response = await fetch(sourceUrl, {
    headers: { 'user-agent': 'Wyckoff-Insights-Importer/1.0' },
  });
  if (!response.ok) throw new Error(`Image request failed (${response.status}): ${sourceUrl}`);
  const buffer = new Uint8Array(await response.arrayBuffer());
  await mkdir(path.dirname(outputPath), { recursive: true });
  return sharp(buffer)
    .rotate()
    .resize({ width: maximumWidth, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(outputPath);
}

function collectImages(html) {
  const fragment = parse5.parseFragment(html);
  const images = [];
  const queue = [...(fragment.childNodes ?? [])];
  while (queue.length) {
    const node = queue.shift();
    if (node.tagName === 'img') {
      const source = getAttribute(node, 'src');
      if (source) images.push(source);
    }
    queue.push(...(node.childNodes ?? []));
  }
  return images;
}

function sanitizeStem(url) {
  return filenameKey(url)
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const posts = await fetchJson(API_URL);
  if (!Array.isArray(posts) || posts.length !== EXPECTED_POST_COUNT) {
    throw new Error(`Expected ${EXPECTED_POST_COUNT} posts; received ${posts?.length ?? 'invalid data'}`);
  }

  const slugs = new Set(posts.map((post) => post.slug));
  if (slugs.size !== EXPECTED_POST_COUNT) throw new Error('Duplicate legacy post slugs detected');

  await mkdir(CONTENT_DIR, { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });

  const imageMap = new Map();
  const altMap = new Map();
  const featuredMedia = new Map();

  for (const post of posts) {
    const source = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (!source) throw new Error(`Missing featured image for ${post.slug}`);
    if (!FEATURED_ALT_BY_SLUG[post.slug]) {
      throw new Error(`Missing authored featured-image alt text for ${post.slug}`);
    }
    const normalizedSource = originalWordPressImageUrl(source);
    const publicPath = `/images/insights/${post.slug}.webp`;
    const outputPath = path.join(PROJECT_ROOT, 'public', publicPath.slice(1));
    const result = await downloadAndOptimize(normalizedSource, outputPath);
    const media = { publicPath, width: result.width, height: result.height };
    imageMap.set(normalizedSource, publicPath);
    altMap.set(normalizedSource, FEATURED_ALT_BY_SLUG[post.slug]);
    featuredMedia.set(post.slug, media);
  }

  for (const post of posts) {
    for (const rawSource of collectImages(post.content.rendered)) {
      const source = originalWordPressImageUrl(rawSource);
      if (imageMap.has(source)) continue;
      const stem = sanitizeStem(source);
      const publicPath = `/images/insights/${post.slug}/${stem}.webp`;
      const outputPath = path.join(PROJECT_ROOT, 'public', publicPath.slice(1));
      await downloadAndOptimize(source, outputPath);
      imageMap.set(source, publicPath);
      const alt = INLINE_ALT_BY_FILENAME[filenameKey(source)];
      if (!alt) throw new Error(`Missing authored inline-image alt text for ${source}`);
      altMap.set(source, alt);
    }
  }

  for (const post of posts) {
    const markdown = htmlToMarkdown(post.content.rendered, { imageMap, altMap }, postTitle(post));
    if (/<img\b[^>]*\bsrc=["']https?:\/\//i.test(markdown)) {
      throw new Error(`Remote body image remains in ${post.slug}`);
    }
    const document = `${frontmatter(post, featuredMedia.get(post.slug))}\n\n${markdown}\n`;
    await writeFile(path.join(CONTENT_DIR, `${post.slug}.md`), document, 'utf8');
  }

  const markdownEntries = (await readdir(CONTENT_DIR)).filter((name) => name.endsWith('.md'));
  if (markdownEntries.length !== EXPECTED_POST_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_POST_COUNT} generated Markdown entries; found ${markdownEntries.length}`,
    );
  }

  console.log(
    `Imported ${posts.length} legacy insights, localized ${imageMap.size} source images, and wrote ${markdownEntries.length} Markdown entries.`,
  );
}

await main();
