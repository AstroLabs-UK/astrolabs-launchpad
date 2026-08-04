import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/astrolabs-logo.png";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | AstroLabs & Co. Web Design Studio" },
      {
        name: "description",
        content:
          "How AstroLabs & Co., a UK web design studio, collects, uses and protects the personal information you share through our website and contact form.",
      },
      { property: "og:title", content: "Privacy Policy | AstroLabs & Co." },
      {
        property: "og:description",
        content:
          "How AstroLabs & Co. collects, uses and protects the personal information you share with us.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: { id: string; title: string; body: string }[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: "Placeholder: introduce AstroLabs & Co., the UK web design studio operating this website, and how to contact us.",
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: "Placeholder: the details submitted through our contact form (name, business name, email address, preferred plan and project details), plus any basic technical information collected automatically.",
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Information",
    body: "Placeholder: describe how enquiries are used to respond, quote and deliver services.",
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    body: "Placeholder: the UK GDPR lawful bases we rely on, such as legitimate interests and contract.",
  },
  {
    id: "sharing",
    title: "Sharing and Third Parties",
    body: "Placeholder: list any hosting, email or analytics providers who process data on our behalf.",
  },
  {
    id: "retention",
    title: "Data Retention",
    body: "Placeholder: how long enquiry records and project files are kept before deletion.",
  },
  {
    id: "cookies",
    title: "Cookies and Local Storage",
    body: "Placeholder: this site stores your accessibility preferences and privacy notice acknowledgement locally in your browser.",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: "Placeholder: access, correction, erasure, objection and complaints to the Information Commissioner's Office.",
  },
  {
    id: "contact",
    title: "Contact Us",
    body: "Placeholder: privacy contact details for questions or data requests.",
  },
];

function PrivacyPage() {
  return (
    <main className="min-h-dvh px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="Back to AstroLabs & Co. home">
          <img src={logo} alt="AstroLabs & Co. logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-display font-bold text-navy">AstroLabs & Co.</span>
        </a>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">Privacy Policy</h1>
        <p className="mt-3 text-foreground/70">
          This page is a framework and the full wording will be added shortly. By submitting our
          contact form you agree to this privacy policy.
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`}>
              <h2 id={`${s.id}-heading`} className="font-display text-xl font-semibold text-navy">
                {s.title}
              </h2>
              <p className="mt-2 text-foreground/80 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <a
          href="/"
          className="mt-12 inline-block rounded-lg bg-deep px-6 py-3 font-medium text-white transition hover:bg-navy"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
