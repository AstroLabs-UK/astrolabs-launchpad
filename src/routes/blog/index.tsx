import { createFileRoute } from '@tanstack/react-router';
import logo from '@/assets/astrolabs-logo.png';
import AccessibilityWidget from '@/components/AccessibilityWidget';

const title = 'Blog - AstroLabs & Co. Web Design Studio';
const description =
  'Insights on accessible, fast web design from AstroLabs & Co., a UK-based web design studio. Articles coming soon.';

export const Route = createFileRoute('/blog/')({
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
            We are putting together articles on accessible, fast and thoughtfully designed websites.
            Nothing published just yet, so check back soon.
          </p>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-white/60 p-8">
            <h2 className="font-display text-xl font-semibold text-navy">Coming soon</h2>
            <p className="mt-2 text-body/80">
              Want to be told when the first post goes live? Get in touch and we will let you know.
            </p>
            <a
              href="/#contact"
              className="mt-6 inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy"
            >
              Contact us
            </a>
          </div>

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
