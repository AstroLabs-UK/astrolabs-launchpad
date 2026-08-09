import { createFileRoute } from "@tanstack/react-router";

// Decap CMS admin shell. Served as a server route so /admin works on
// Cloudflare and in preview without relying on directory index resolution.
const ADMIN_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Content Manager - AstroLabs &amp; Co.</title>
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="cms-config-url" type="text/yaml" href="/admin/config.yml" />
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.9.0/dist/decap-cms.js"></script>
  </body>
</html>`;

export const Route = createFileRoute("/admin")({
  server: {
    handlers: {
      GET: async () =>
        new Response(ADMIN_HTML, {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
