import { createFileRoute } from '@tanstack/react-router';
import logo from '@/assets/astrolabs-logo.png';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { getPosts, formatDate } from '@/lib/blog';

const title = 'Blog - AstroLabs & Co. Web Design Studio';
const description =
  'Insights on accessible, fast web design from AstroLabs & Co., a UK-based web design studio.';

export const Route = createFileRoute('/blog/')({
  loader: () => ({ posts: getPosts() }),
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-deep focus:text-white"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-dvh px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="inline-flex items-center gap-2.5" aria-label="Back to AstroLabs & Co. home">
              <img src={logo} alt="AstroLabs & Co. logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-display font-bold text-navy">AstroLabs & Co.</span>
            </a>
            <a
              href="/"
              className="inline-block rounded-lg bg-deep px-4 py-2 text-sm font-medium text-white transition hover:bg-navy"
            >
              Back to home
            </a>
          </div>

          <h1 className="font-display text-4xl font-bold text-navy">Blog</h1>
          <p className="mt-4 text-lg text-body/80">
            Notes on accessible, fast and thoughtfully designed websites for UK small businesses.
          </p>

          {posts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-primary/30 bg-white/60 p-8">
              <h2 className="font-display text-xl font-semibold text-navy">Coming soon</h2>
              <p className="mt-2 text-body/80">
                Nothing published just yet. Check back soon for the first article.
              </p>
              <a
                href="mailto:hello@astrolabs.uk"
                className="mt-6 inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy"
              >
                Contact us
              </a>
            </div>
          ) : (
            <ul className="mt-10 space-y-6">
              {posts.map((post: (typeof posts)[number]) => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl border border-primary/30 bg-white/60 p-6 transition hover:-translate-y-0.5 hover:border-deep"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-deep">
                      {post.category}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-semibold text-navy">{post.title}</h2>
                    <p className="mt-1 text-sm text-body/60">
                      {formatDate(post.date)} · {post.author}
                    </p>
                    <p className="mt-3 text-body/80">{post.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a
            href="/"
            className="mt-12 inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy"
          >
            Back to home
          </a>
        </div>
      </main>
      <AccessibilityWidget />
    </>
  );
}
