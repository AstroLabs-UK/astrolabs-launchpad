import { Link } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { DropInBlogContent } from '@dropinblog/react-core';
import type { RenderedResponse } from '@dropinblog/react-core';
import logo from '@/assets/astrolabs-logo.png';
import AccessibilityWidget from '@/components/AccessibilityWidget';

function BackToHomeButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="/"
      className={`inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy ${className}`}
    >
      Back to home
    </a>
  );
}

/**
 * Renders the server-rendered blog HTML wrapped in the AstroLabs site layout.
 */
export function BlogPage({ data }: { data: RenderedResponse }) {
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
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="inline-flex items-center gap-2.5" aria-label="Back to AstroLabs & Co. home">
              <img src={logo} alt="AstroLabs & Co. logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-display font-bold text-navy">AstroLabs & Co.</span>
            </a>
            <BackToHomeButton className="px-4 py-2 text-sm" />
          </div>

          <DropInBlogContent bodyHtml={data.body_html ?? ''} />

          <BackToHomeButton className="mt-12" />
        </div>
      </main>
      <AccessibilityWidget />
    </>
  );
}


/**
 * Shown when a post/category/author isn't found (the rendered API returned 404,
 * which the adapter converts into a TanStack notFound()). Customize the markup
 * to match your site.
 */
export function BlogNotFound() {
  return (
    <div className="blog-message">
      <h1>Post not found</h1>
      <p>The article you’re looking for doesn’t exist or may have been moved.</p>
      <p>
        <Link to="/blog">← Back to the blog</Link>
      </p>
    </div>
  );
}

/**
 * Shown for unexpected failures (network, bad credentials, API 5xx). The raw
 * error is only revealed during development — in production visitors see a
 * friendly message instead of the underlying API payload.
 */
export function BlogError({ error }: ErrorComponentProps) {
  return (
    <div className="blog-message">
      <h1>Something went wrong</h1>
      <p>We couldn’t load the blog right now. Please try again later.</p>
      {import.meta.env.DEV && error instanceof Error ? (
        <pre className="blog-error-detail">{error.message}</pre>
      ) : null}
    </div>
  );
}
