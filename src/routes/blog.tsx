import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/astrolabs-logo.png";
import AccessibilityWidget from "@/components/AccessibilityWidget";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | AstroLabs & Co. UK Web Design Studio" },
      {
        name: "description",
        content:
          "Practical notes on web design, site speed, accessibility, and getting found on Google, written for UK small business owners by AstroLabs & Co.",
      },
      { property: "og:title", content: "Blog | AstroLabs & Co." },
      {
        property: "og:description",
        content:
          "Practical web design, speed, accessibility, and SEO notes for UK small business owners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.astrolabs.uk/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog | AstroLabs & Co." },
      {
        name: "twitter:description",
        content: "Practical web design, speed, accessibility, and SEO notes for UK small business owners.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.astrolabs.uk/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "AstroLabs & Co. Blog",
          url: "https://www.astrolabs.uk/blog",
          description:
            "Web design, site speed, accessibility, and SEO notes for UK small businesses.",
          publisher: {
            "@type": "Organization",
            name: "AstroLabs & Co.",
            url: "https://www.astrolabs.uk",
          },
        }),
      },
    ],
  }),
  component: BlogPage,
});

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

// Framework only: add real posts here (or wire this list to the database later).
const POSTS: Post[] = [];

function BlogPage() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-deep focus:text-white">
        Skip to main content
      </a>
    <main id="main-content" className="min-h-dvh px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="Back to AstroLabs & Co. home">
          <img src={logo} alt="AstroLabs & Co. logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-display font-bold text-navy">AstroLabs & Co.</span>
        </a>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">Blog</h1>
        <p className="mt-3 max-w-2xl text-foreground/70 leading-relaxed">
          Plain English notes on web design, site speed, accessibility, and getting found on Google, written for UK
          small business owners.
        </p>

        {POSTS.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border bg-white/60 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-navy">First posts coming soon</h2>
            <p className="mx-auto mt-2 max-w-md text-foreground/70 leading-relaxed">
              We are writing our first articles now. In the meantime, if there is something you would like us to cover,
              email{" "}
              <a href="mailto:hello@astrolabs.uk" className="font-medium text-deep hover:underline">
                hello@astrolabs.uk
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <article className="rounded-xl border border-border bg-white/60 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-navy">{post.title}</h2>
                  <p className="mt-2 text-foreground/75 leading-relaxed">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-foreground/55">{post.date}</p>
                </article>
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
