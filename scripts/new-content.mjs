#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { slugify } from '../lib/slugify.ts';

function escapeYamlSingleQuoted(value) {
  return value.replace(/'/g, "''");
}

export function frontmatterFor(type, title, date) {
  const safeTitle = escapeYamlSingleQuoted(title);
  if (type === 'post') {
    return `---
title: '${safeTitle}'
summary: ''
date: '${date}'
tags: []
draft: true
---

`;
  }
  if (type === 'til') {
    return `---
title: '${safeTitle}'
description: ''
date: '${date}'
tags: []
draft: true
---

`;
  }
  if (type === 'project') {
    return `---
name: '${safeTitle}'
tagline: ''
description: ''
tags: []
date: '${date}'
featured: false
draft: true
---

`;
  }
  throw new Error(`Unknown content type: ${type}`);
}

const DIRS = {
  post: 'content/blog',
  til: 'content/til',
  project: 'content/projects',
};

function main() {
  const [type, ...titleParts] = process.argv.slice(2);
  const title = titleParts.join(' ').trim();

  if (!DIRS[type] || !title) {
    console.error('Usage: node scripts/new-content.mjs <post|til|project> <title>');
    process.exit(1);
  }

  const slug = slugify(title);
  if (!slug) {
    console.error(
      `Title "${title}" produces an empty slug. Please use a title with at least one alphanumeric character.`
    );
    process.exit(1);
  }

  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(process.cwd(), DIRS[type], `${slug}.mdx`);

  if (fs.existsSync(file)) {
    console.error(`Refusing to overwrite existing file: ${file}`);
    process.exit(1);
  }

  fs.writeFileSync(file, frontmatterFor(type, title, date));
  console.log(`Created ${file}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
