import type { APIRoute } from 'astro'

// Every static page under src/pages becomes one canonical (trailing slash) URL.
const pages = import.meta.glob('./**/*.astro')

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://kmrvidskills.dev')
  const paths = Object.keys(pages)
    .map((file) =>
      file
        .replace(/^\.\//, '')
        .replace(/\.astro$/, '')
        .replace(/(^|\/)index$/, '$1'),
    )
    .filter((path) => !path.includes('['))
    .map((path) => (path === '' || path.endsWith('/') ? path : `${path}/`))
    .sort()
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
