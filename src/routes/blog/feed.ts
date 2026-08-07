import { createFileRoute } from '@tanstack/react-router';
import { createStartServerClient } from '@dropinblog/react-tanstack-start';
import { getDropInBlogCredentials } from '@/lib/dropinblog.server';

// Main RSS feed: /blog/feed
export const Route = createFileRoute('/blog/feed')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { blogId, apiKey } = await getDropInBlogCredentials();
        const client = createStartServerClient({ blogId, apiKey, blogUrl: `${origin}/blog` });
        const data = await client.fetchFeed();
        const feedXml = (data as { feed?: string }).feed ?? data.body_html ?? '';

        return new Response(feedXml, {
          status: 200,
          headers: {
            'Content-Type': data.content_type ?? 'application/rss+xml',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      },
    },
  },
});
