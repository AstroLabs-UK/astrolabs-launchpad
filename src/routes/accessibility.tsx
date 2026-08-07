import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/astrolabs-logo.png";
import AccessibilityWidget from "@/components/AccessibilityWidget";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement | AstroLabs & Co." },
      {
        name: "description",
        content:
          "AstroLabs & Co. builds accessible websites. Read our commitment to WCAG 2.1 AA, the features built into this site, and how to report an accessibility issue.",
      },
      { property: "og:title", content: "Accessibility Statement | AstroLabs & Co." },
      {
        property: "og:description",
        content:
          "Our commitment to WCAG 2.1 AA, the accessibility features built into this site, and how to report an issue.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.astrolabs.uk/accessibility" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Accessibility Statement | AstroLabs & Co." },
      {
        name: "twitter:description",
        content: "How AstroLabs & Co. makes this site, and every site we build, accessible to everyone.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.astrolabs.uk/accessibility" }],
  }),
  component: AccessibilityPage,
});

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };

const SECTIONS: { id: string; title: string; blocks: Block[] }[] = [
  {
    id: "commitment",
    title: "1. Our Commitment",
    blocks: [
      {
        type: "p",
        text: "AstroLabs & Co. is committed to making www.astrolabs.uk usable by as many people as possible, regardless of ability or technology. Accessibility is part of how we build, not an afterthought, and every website we deliver for clients is built to the same standard.",
      },
    ],
  },
  {
    id: "standard",
    title: "2. Standard We Follow",
    blocks: [
      {
        type: "p",
        text: "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with visual, hearing, motor, and cognitive disabilities.",
      },
    ],
  },
  {
    id: "features",
    title: "3. Accessibility Features on This Site",
    blocks: [
      { type: "p", text: "This website includes the following features:" },
      {
        type: "list",
        items: [
          "A skip to main content link for keyboard and screen reader users",
          "An accessibility toolbar with reduced motion, larger text, and simplified styling options",
          "Full keyboard navigation with visible focus states",
          "Semantic headings, landmarks, and ARIA labels for screen readers",
          "Descriptive alternative text on images and icons",
          "Colour contrast checked against WCAG AA minimums",
          "Respect for the operating system prefers-reduced-motion setting",
          "Responsive layouts that work at 200 percent zoom and on small screens",
        ],
      },
    ],
  },
  {
    id: "toolbar",
    title: "4. Using the Accessibility Toolbar",
    blocks: [
      {
        type: "p",
        text: "The accessibility button in the bottom right corner of every page opens a panel where you can reduce motion, increase text size, or remove decorative styling. Your choices are saved in your browser and can be undone at any time with the reset button at the top of the panel.",
      },
    ],
  },
  {
    id: "limitations",
    title: "5. Known Limitations",
    blocks: [
      {
        type: "p",
        text: "We test regularly, but some issues may remain. Third party content that we do not control, such as embedded external tools, may not always meet the same standard. If you find a barrier anywhere on the site we want to hear about it.",
      },
    ],
  },
  {
    id: "feedback",
    title: "6. Feedback and Reporting an Issue",
    blocks: [
      {
        type: "p",
        text: "If you have difficulty using any part of this website, or you need information in a different format, email hello@astrolabs.uk with the page address and a short description of the problem. We aim to respond within five working days.",
      },
    ],
  },
  {
    id: "enforcement",
    title: "7. Enforcement",
    blocks: [
      {
        type: "p",
        text: "If you are not happy with our response, you can contact the Equality Advisory and Support Service (EASS), which advises on accessibility complaints in the United Kingdom.",
      },
    ],
  },
];

function AccessibilityPage() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-deep focus:text-white">
        Skip to main content
      </a>
    <main id="main-content" className="min-h-dvh px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
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

        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">Accessibility Statement</h1>
        <p className="mt-2 text-sm text-foreground/60">Last updated: August 2026</p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`}>
              <h2 id={`${s.id}-heading`} className="font-display text-xl font-semibold text-navy">
                {s.title}
              </h2>
              <div className="mt-2 space-y-3">
                {s.blocks.map((b, i) =>
                  b.type === "p" ? (
                    <p key={i} className="text-foreground/80 leading-relaxed">
                      {b.text}
                    </p>
                  ) : (
                    <ul key={i} className="list-disc space-y-1 pl-5 text-foreground/80 leading-relaxed">
                      {b.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}

          <section id="contact" aria-labelledby="a11y-contact-heading">
            <h2 id="a11y-contact-heading" className="font-display text-xl font-semibold text-navy">
              8. Contact Us
            </h2>
            <address className="mt-3 not-italic text-foreground/80 leading-relaxed">
              AstroLabs & Co.
              <br />
              Email:{" "}
              <a href="mailto:hello@astrolabs.uk" className="font-medium text-deep hover:underline">
                hello@astrolabs.uk
              </a>
              <br />
              Location: Maidstone, Kent, United Kingdom
              <br />
              Website:{" "}
              <a href="https://www.astrolabs.uk" className="font-medium text-deep hover:underline">
                www.astrolabs.uk
              </a>
            </address>
          </section>
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
