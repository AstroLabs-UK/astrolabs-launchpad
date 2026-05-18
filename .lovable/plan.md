# Sitemap for Google Submission

## What

Create a dynamic `/sitemap.xml` server route for the AstroLabs single-page site so the user can submit it to Google Search Console.

## Why

Google and other search engines use sitemaps to discover and index pages. The site currently has no sitemap.

## Implementation

1. **Create `src/routes/sitemap[.]xml.ts**`
  - Server route that returns a valid XML sitemap.
  - Include the single public route: `/` (homepage).
  - Set `changefreq: "weekly"` and `priority: "1.0"` for the homepage.
  - Use the preview URL as `BASE_URL` initially; user should update after publishing.
  - Return proper `Content-Type: application/xml` and a short `Cache-Control` header.
2. **Create `public/robots.txt**`
  - Allow all crawlers to access everything.
  - Optional: add a `Sitemap:` directive pointing to `/sitemap.xml` so crawlers auto-discover it.

## Post-creation

Provide the full sitemap URL to the user for Google Search Console submission.

## Technical notes

- Uses TanStack Start server route pattern (`createFileRoute` with `server.handlers.GET`).
- No external dependencies required.
- Single static route entry since this is a one-page site.

&nbsp;

Ensure the contact form sends the requests to hello@astrolabs.uk