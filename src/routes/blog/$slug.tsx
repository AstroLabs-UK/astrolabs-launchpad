import { createFileRoute, notFound } from '@tanstack/react-router';
import logo from '@/assets/astrolabs-logo.png';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { getPost, renderMarkdown, formatDate } from '@/lib/blog';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, html: renderMarkdown(post.body) };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} - AstroLabs & Co.` : 'Blog post - AstroLabs & Co.';
    const description =
      post?.description ?? 'An article from the AstroLabs & Co. web design studio blog.';
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, html } = Route.useLoaderData();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-deep focus:text-white"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-dvh px-6 py-16">
        <article className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="inline-flex items-center gap-2.5" aria-label="Back to AstroLabs & Co. home">
              <img src={logo} alt="AstroLabs & Co. logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-display font-bold text-navy">AstroLabs & Co.</span>
            </a>
            <a
              href="/blog"
              className="inline-block rounded-lg bg-deep px-4 py-2 text-sm font-medium text-white transition hover:bg-navy"
            >
              All posts
            </a>
          </div>

          <p className="text-sm font-medium text-deep">{post.category}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-navy">{post.title}</h1>
          <p className="mt-3 text-sm text-body/70">
            {formatDate(post.date)} · {post.author}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt ?? post.title}
              loading="lazy"
              className="mt-8 w-full rounded-2xl border border-primary/30 object-cover"
            />
          )}

          <div
            className="prose-astro mt-8 text-body/85"
            // Content authored by the studio in the content manager.
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-primary/40 bg-white/60 px-3 py-1 text-xs text-body/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="/blog"
              className="inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy"
            >
              Back to blog
            </a>
            <a
              href="/"
              className="inline-block rounded-lg border border-steel/40 bg-white px-6 py-3 font-medium text-deep transition hover:border-deep"
            >
              Back to home
            </a>
          </div>
        </article>
      </main>
      <AccessibilityWidget />
    </>
  );
}
