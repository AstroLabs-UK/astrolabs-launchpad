import { createFileRoute } from '@tanstack/react-router';
import { createStartServerClient } from '@dropinblog/react-tanstack-start';
import { getDropInBlogCredentials } from '@/lib/dropinblog.server';

// XML sitemap: /blog/sitemap.xml
// The `[.]` in the filename escapes the dot so it becomes a literal path
// segment rather than a flat-route separator.
export const Route = createFileRoute('/blog/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { blogId, apiKey } = await getDropInBlogCredentials();
        const client = createStartServerClient({ blogId, apiKey, blogUrl: `${origin}/blog` });
        const data = await client.fetchSitemap();
        const sitemapXml = (data as { sitemap?: string }).sitemap ?? data.body_html ?? '';

        return new Response(sitemapXml, {
          status: 200,
          headers: {
            'Content-Type': data.content_type ?? 'application/xml',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      },
    },
  },
});
