import { createServerFn } from '@tanstack/react-start';
import { getRequestUrl } from '@tanstack/react-start/server';
import { resolveBlogData } from '@dropinblog/react-tanstack-start';
import { getDropInBlogCredentials } from '@/lib/dropinblog.server';

/**
 * Server function that fetches the rendered blog payload for a given splat path.
 *
 * Credentials are read at call time (never at module scope) so this works on
 * Cloudflare's workerd runtime, where env is injected per request.
 */
export const fetchBlogData = createServerFn({ method: 'GET' })
  .inputValidator((splat: string) => splat)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .handler(async ({ data }): Promise<any> => {
    const origin = new URL(getRequestUrl()).origin;
    try {
      const { blogId, apiKey } = await getDropInBlogCredentials();
      const result = await resolveBlogData(data, {
        blogId,
        apiKey,
        blogUrl: `${origin}/blog`,
      });
      return result as unknown as Record<string, unknown>;
    } catch (error) {
      // notFound() and redirects must pass through untouched.
      if (error && typeof error === 'object' && ('isNotFound' in error || 'routerCode' in error)) {
        throw error;
      }
      console.error('[blog] failed to load DropInBlog data', error);
      throw error;
    }
  });
