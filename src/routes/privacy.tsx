import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/astrolabs-logo.png";
import AccessibilityWidget from "@/components/AccessibilityWidget";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | AstroLabs & Co. Web Design Studio" },
      {
        name: "description",
        content:
          "How AstroLabs UK collects, uses, stores and protects the personal information you share through our website contact forms.",
      },
      { property: "og:title", content: "Privacy Policy | AstroLabs & Co." },
      {
        property: "og:description",
        content:
          "How AstroLabs UK collects, uses, stores and protects the personal information you share with us.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };

const SECTIONS: { id: string; title: string; blocks: Block[] }[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: 'AstroLabs UK ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you contact us through our website.',
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    blocks: [
      { type: "p", text: "When you submit a contact form on our website, we collect the following information:" },
      {
        type: "list",
        items: ["Your name", "Your email address", "Your project description", "Your company information"],
      },
      {
        type: "p",
        text: "We only collect information that you voluntarily provide through our contact forms. We do not collect any payment information through our website forms; payment information is processed separately outside of our systems through secure payment methods you will be informed about directly.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "3. How We Use Your Information",
    blocks: [
      { type: "p", text: "We use the information you provide for the following purposes:" },
      {
        type: "list",
        items: [
          "To respond to your inquiry and provide you with relevant information about our services",
          "To understand your project requirements for website creation and development",
          "To store your company information for reference during project discussions and development",
          "To improve our services and website based on user feedback",
        ],
      },
      { type: "p", text: "We will not use your information for any other purpose without your explicit consent." },
    ],
  },
  {
    id: "storage-security",
    title: "4. Data Storage and Security",
    blocks: [
      {
        type: "p",
        text: "Form submissions are processed through Cloudflare Pages, our website hosting platform. Your data is then securely transmitted to our systems via Gmail and stored in our Supabase database, hosted in either the London or Frankfurt region depending on availability and performance requirements.",
      },
      {
        type: "p",
        text: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our security practices include:",
      },
      {
        type: "list",
        items: [
          "Encrypted data transmission for all form submissions",
          "Secure authentication and access controls for our databases",
          "Restricted access to personal data to authorized personnel only",
          "Regular security monitoring and maintenance of our systems",
          "Industry-standard database security protocols",
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "5. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including responding to your inquiry and completing any project work. If we do not hear from you for a period of 24 months, we may delete your information unless you have an active project or ongoing relationship with us.",
      },
      {
        type: "p",
        text: "You may request deletion of your data at any time by contacting us using the details provided below.",
      },
    ],
  },
  {
    id: "sharing",
    title: "6. Data Sharing and Third Parties",
    blocks: [
      {
        type: "p",
        text: "We do not sell, rent, or lease your personal information to third parties. However, your data is processed by the following service providers to deliver our services:",
      },
      {
        type: "list",
        items: [
          "Cloudflare Pages: Our website hosting platform that processes form submissions",
          "Gmail: Our email service where form submissions are received and stored during processing",
          "Supabase: Our cloud database provider where your information is securely stored",
        ],
      },
      {
        type: "p",
        text: "These third parties act as data processors on our behalf and are contractually obligated to protect your data and use it only for the purposes we specify. We remain responsible for how they handle your information.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    blocks: [
      { type: "p", text: "Under UK and EU data protection law, you have the following rights:" },
      {
        type: "list",
        items: [
          "The right to access your personal data and obtain a copy of it",
          "The right to correct inaccurate or incomplete information",
          "The right to request deletion of your personal data",
          "The right to restrict how we process your information",
          "The right to data portability (receive your data in a structured format)",
          "The right to withdraw consent at any time",
        ],
      },
      { type: "p", text: "To exercise any of these rights, please contact us using the details provided below." },
    ],
  },
  {
    id: "international-transfer",
    title: "8. International Data Transfer",
    blocks: [
      {
        type: "p",
        text: "Your information is primarily stored in the United Kingdom or European Union (Frankfurt region). When data is transferred between these regions or through Cloudflare's global network during form submission, we ensure appropriate safeguards are in place in accordance with UK data protection regulations and UK GDPR requirements.",
      },
    ],
  },
  {
    id: "cookies",
    title: "9. Cookies and Tracking",
    blocks: [
      {
        type: "p",
        text: "Our website does not use cookies or tracking technologies to collect personal information. Any analytics or website performance data collected is anonymous and does not identify you personally.",
      },
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology integrations, or applicable law. We will notify you of any material changes by updating the "Last updated" date at the top of this page. Your continued use of our website following such changes constitutes your acceptance of the updated policy.',
      },
    ],
  },
];

function PrivacyPage() {
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

        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">Privacy Policy</h1>
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

          <section id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="font-display text-xl font-semibold text-navy">
              11. Contact Us
            </h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy, wish to exercise your data rights, or have concerns
              about how we handle your personal information, please contact us:
            </p>
            <address className="mt-3 not-italic text-foreground/80 leading-relaxed">
              AstroLabs UK
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
                astrolabs.uk
              </a>
            </address>
          </section>

          <section id="data-protection-authority" aria-labelledby="dpa-heading">
            <h2 id="dpa-heading" className="font-display text-xl font-semibold text-navy">
              12. Data Protection Authority
            </h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              If you believe we have violated your data protection rights, you have the right to lodge a complaint with
              the Information Commissioner's Office (ICO), the UK's independent data protection authority.
            </p>
            <address className="mt-3 not-italic text-foreground/80 leading-relaxed">
              Website:{" "}
              <a href="https://www.ico.org.uk" className="font-medium text-deep hover:underline">
                www.ico.org.uk
              </a>
              <br />
              Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
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
