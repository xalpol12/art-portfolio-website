// Generates public/sitemap.xml and public/robots.txt from the site's projects data.
// Requires the SITE_BASE_URL env var (e.g. `SITE_BASE_URL=https://myartist.com npm run build`).
// Skips silently (with a warning) when it isn't set, so local/dev builds aren't blocked.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const baseUrl = process.env.SITE_BASE_URL;

if (!baseUrl) {
  console.warn('[generate-sitemap] SITE_BASE_URL is not set — skipping sitemap.xml/robots.txt generation.');
  process.exit(0);
}

const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
const projects = JSON.parse(readFileSync(path.join(appRoot, 'src/assets/data/projects.json'), 'utf-8'));

const staticPaths = ['/', '/projects', '/bio', '/contact'];
const projectPaths = projects.map((project) => `/projects/${project.id}`);
const urls = [...staticPaths, ...projectPaths];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${normalizedBaseUrl}${url}</loc></url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${normalizedBaseUrl}/sitemap.xml
`;

writeFileSync(path.join(appRoot, 'public/sitemap.xml'), sitemap);
writeFileSync(path.join(appRoot, 'public/robots.txt'), robots);

console.log(`[generate-sitemap] Wrote sitemap.xml with ${urls.length} URLs and robots.txt.`);
