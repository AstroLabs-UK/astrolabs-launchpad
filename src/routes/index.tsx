import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/astrolabs-logo.png";
import AccessibilityWidget from "@/components/AccessibilityWidget";

// import goodVibesImg from "@/assets/portfolio-goodvibes.jpg";
// import puddingsImg from "@/assets/portfolio-puddings.jpg";

const FAQS = [
  { q: "How much does a professional website cost in the UK?", a: "At AstroLabs & Co., our professional web design packages start from £299 for a complete launch. We offer transparent, one-off pricing with no hidden fees." },
  { q: "Do you provide hosting and domain names?", a: "Yes, we include free hosting and domain registration in our Launch and Pro packages. We handle all the technical setup so you don't have to." },
  { q: "How long does it take to build a website?", a: "Most local business websites are designed and launched within 2-4 weeks, depending on the complexity and how quickly we receive your content." },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.astrolabs.uk/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});


const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  // { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "CRM", href: "https://crm.astrolabs.uk" },
];

const TYPEWRITER_WORDS = [
  "You Grow.",
  "You Imagine.",
  "You Design.",
  "You Create.",
  "You Launch.",
  "You Scale.",
  "You Thrive.",
  "You Shine.",
];

function TypewriterText() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
    } else {
      const delta = isDeleting ? 60 : 100;
      timer = setTimeout(() => {
        setDisplayed((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }, delta);
    }

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="inline-block min-w-[9ch]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(74,81,112,0.3)]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="AstroLabs & Co. Home">
          <img src={logo} alt="AstroLabs & Co. web design studio logo" width={36} height={36} decoding="async" fetchPriority="high" className="h-9 w-9 transition-transform group-hover:rotate-12" />
          <span className="font-display font-bold text-navy text-lg tracking-tight">AstroLabs <span className="text-steel">& Co.</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={(e) => handleNavClick(e, n.href)}
                className="text-sm font-medium text-foreground/70 hover:text-deep transition-colors"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-deep"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border">
          <ul className="px-6 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => handleNavClick(e, n.href)}
                  className="block text-sm font-medium text-foreground/80 hover:text-deep transition-colors py-1"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function StarField() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stars = Array.from({ length: 55 }, (_, i) => {
    const r = Math.random();
    const size = r < 0.4 ? 1 : r < 0.8 ? 1.5 : 2;
    return {
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 3.5,
    };
  });
  
  const brightStars = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    top: 10 + Math.random() * 80,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-navy animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {brightStars.map((s) => (
        <span
          key={`b-${s.id}`}
          className="absolute rounded-full bg-navy animate-star-glow"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: "3px",
            height: "3px",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-steel/20 animate-orbit" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-steel/10" />
      <div className="absolute top-[55%] left-[62%] -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full border border-navy/10 animate-orbit-slow" />
      <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-steel/40 to-navy/30 blur-3xl animate-drift" />
      <div className="absolute -left-32 top-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-steel/30 to-deep/20 blur-3xl animate-drift" style={{ animationDelay: "3s" }} />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-16 overflow-hidden hero-vignette">
      <StarField />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-steel/15 border border-steel/30 text-navy text-xs font-medium mb-8 animate-badge-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-deep animate-twinkle" />
          UK-based web design studio
        </div>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-navy leading-[0.95]">
          <span className="text-shimmer">AstroLabs</span> <span className="text-steel">& Co.</span>
          <span className="sr-only"> — Web Design Studio for UK Small Businesses</span>
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-display font-medium text-deep">
          We Build. <TypewriterText />
        </p>
        <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed">
          Professional websites for local businesses across the UK. No jargon, no hidden fees, just results.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="btn-comet px-7 py-3.5 rounded-lg bg-deep text-white font-medium hover:bg-navy transition-all hover:-translate-y-0.5 shadow-lg shadow-deep/20">
            Get a Quote
          </a>
          <a href="#services" className="px-7 py-3.5 rounded-lg bg-white text-deep font-medium border border-steel/40 hover:border-deep hover:-translate-y-0.5 transition-all">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-16">
      <p className="text-xs uppercase tracking-[0.2em] text-steel font-semibold mb-3">{eyebrow}</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">{title}</h2>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}



function SectionCurve({ fill, bg, flip = false, tintPct }: { fill: string; bg: string; flip?: boolean; tintPct?: number }) {
  // tintPct kept for future tuning; currently a visual placeholder
  void tintPct;
  return (
    <div aria-hidden="true" style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[70px]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <path d="M0,35 C360,80 1080,-10 1440,35 L1440,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  );
}


function About() {
  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      num: "2", label: "Sites Launched",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
      num: "3", label: "Pricing Plans",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      num: "1", label: "Year Support Included",
    },
  ];
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="blob-field" />
      <div className="relative max-w-5xl mx-auto">
        <div className="reveal"><SectionHeading eyebrow="About" title="Who We Are" /></div>
        <p className="reveal text-lg md:text-xl text-center text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          We're a small UK-based web studio that helps local businesses get online and look great doing it. We handle everything — design, build, and hosting — so you can focus on running your business.
        </p>
        <div className="mt-20 grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal card-lift card-glow p-8 rounded-2xl bg-white border border-border text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex justify-center text-deep">{s.icon}</div>
              <div className="font-display font-bold text-5xl text-deep">{s.num}</div>
              <div className="mt-2 text-sm text-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19l7-7-7-7M5 19l7-7-7-7" />
        </svg>
      ),
      title: "Design",
      desc: "Custom websites built to reflect your brand and stand out from the crowd.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Hosting",
      desc: "Fast, reliable, free hosting on our end — no extra invoices to worry about.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Support",
      desc: "1 year of bug fixes and updates included with every build.",
    },
  ];
  return (
    <section id="services" className="relative py-32 px-6 section-tint-strong overflow-hidden">
      <div className="blob-field" />
      <div className="relative max-w-6xl mx-auto">
        <div className="reveal"><SectionHeading eyebrow="Services" title="What We Do" /></div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <article
              key={s.title}
              className="reveal group card-lift p-8 rounded-2xl bg-white border border-border hover:bg-deep hover:border-deep"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="mb-5 text-deep group-hover:text-white transition-colors">{s.icon}</div>
              <h3 className="font-display font-bold text-2xl text-navy group-hover:text-white transition-colors">{s.title}</h3>
              <p className="mt-3 text-foreground/70 group-hover:text-white/80 leading-relaxed transition-colors">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
function Portfolio() {
  return null;
}
*/

function Pricing() {
  const plans = [
    {
      name: "Launch", price: "£299", popular: false,
      best: "For businesses on a budget",
      features: ["Custom website design & build", "Free hosting and domain included", "1 year bug fixes & support", "\"Made by AstroLabs & Co.\" badge on site"],
    },
    {
      name: "Standard", price: "£399", popular: true,
      best: "Most flexible",
      features: ["Custom website design & build", "You manage your own hosting", "No AstroLabs badge", "1 year bug fixes & support", "Domain for 2 years"],
    },
    {
      name: "Pro", price: "£699", popular: false,
      best: "All-inclusive",
      features: ["Custom website design & build", "Free hosting included", "No AstroLabs badge", "1 year bug fixes & support", "Optional £20/mo retainer + domain after year 1", "Domain for 2 years"],
    },
  ];
  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="reveal"><SectionHeading eyebrow="Pricing" title="Simple, Transparent Pricing" /></div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`reveal card-lift relative p-8 rounded-2xl flex flex-col ${
                p.popular
                  ? "pricing-glow bg-deep text-white border-2 border-deep shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--navy)_45%,transparent)] md:scale-[1.04] md:-my-1 z-10"
                  : "bg-white border border-border"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-steel to-navy text-white text-[11px] font-semibold tracking-[0.14em] shadow-lg shadow-navy/30 animate-badge-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  MOST POPULAR
                </span>
              )}
              <h3 className={`font-display font-bold text-2xl ${p.popular ? "text-white" : "text-navy"}`}>{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`font-display font-bold text-5xl ${p.popular ? "text-white" : "text-deep"}`}>{p.price}</span>
                <span className={`text-sm ${p.popular ? "text-white/60" : "text-foreground/60"}`}>one-off</span>
              </div>
              <p className={`mt-2 text-sm ${p.popular ? "text-white/70" : "text-foreground/60"}`}>{p.best}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`flex gap-2.5 text-sm ${p.popular ? "text-white/90" : "text-foreground/80"}`}>
                    <span className={p.popular ? "text-steel" : "text-deep"} aria-hidden="true">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 text-center px-5 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 ${
                  p.popular
                    ? "bg-white text-deep hover:bg-steel hover:text-white shadow-md"
                    : "bg-deep text-white hover:bg-navy"
                }`}
              >
                Choose {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = FAQS;

  return (
    <section id="faq" className="relative py-32 px-6 section-tint">
      <div className="max-w-3xl mx-auto">
        <div className="reveal"><SectionHeading eyebrow="FAQ" title="Common Questions" /></div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="faq-item reveal card-lift group rounded-2xl bg-white border border-border p-2"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-5">
                <h3 className="font-display font-semibold text-lg md:text-xl text-navy pr-2">{faq.q}</h3>
                <span className="faq-chev shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-deep" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </summary>
              <div className="faq-body">
                <div>
                  <p className="px-5 pb-5 pt-1 text-foreground/70 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSent(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--steel) 8%, transparent))" }} />
        <div className="absolute top-1/3 left-[-10%] w-[26rem] h-[26rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--steel) 22%, transparent), transparent 65%)" }} />
        <div className="absolute bottom-0 right-[-10%] w-[28rem] h-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--navy) 18%, transparent), transparent 65%)" }} />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="reveal"><SectionHeading eyebrow="Contact" title="Let's Build Something" /></div>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
          <form onSubmit={handleSubmit} className="reveal glass-card space-y-4 p-8 md:p-10 rounded-3xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-navy/70 ml-1">Your Name</label>
                <input id="name" name="name" required placeholder="John Doe" className="px-4 py-3 rounded-lg border border-border bg-white/70 focus:outline-none focus:border-deep focus:bg-white transition" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="business" className="text-xs font-semibold text-navy/70 ml-1">Business Name</label>
                <input id="business" name="business" required placeholder="My Local Business" className="px-4 py-3 rounded-lg border border-border bg-white/70 focus:outline-none focus:border-deep focus:bg-white transition" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-navy/70 ml-1">Email Address</label>
              <input id="email" name="email" required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-border bg-white/70 focus:outline-none focus:border-deep focus:bg-white transition" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-navy/70 ml-1">Project Details</label>
              <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project…" className="w-full px-4 py-3 rounded-lg border border-border bg-white/70 focus:outline-none focus:border-deep focus:bg-white transition resize-none" />
            </div>
            <button type="submit" disabled={sending} className="btn-comet w-full px-6 py-3.5 rounded-lg bg-deep text-white font-medium hover:bg-navy transition-all hover:-translate-y-0.5 shadow-lg shadow-deep/20">
              {sent ? "Thanks — we'll be in touch ✦" : sending ? "Sending…" : "Send Message"}
            </button>
            <p className="pt-2 text-center text-sm text-foreground/70">
              Or email us at{" "}
              <a href="mailto:hello@astrolabs.uk" className="text-deep font-medium hover:underline">hello@astrolabs.uk</a>
            </p>
          </form>

          <div className="reveal hidden lg:block relative aspect-square" aria-hidden="true">
            <div className="absolute inset-6 rounded-full border border-steel/30 animate-orbit-slow" />
            <div className="absolute inset-16 rounded-full border border-navy/20 animate-orbit" />
            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-steel/30 to-navy/20 blur-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logo} alt="" className="h-24 w-24 opacity-90 drop-shadow-[0_10px_30px_color-mix(in_oklab,var(--navy)_35%,transparent)]" />
            </div>
            <span className="absolute top-6 right-10 w-2 h-2 rounded-full bg-navy animate-star-glow" />
            <span className="absolute bottom-12 left-6 w-1.5 h-1.5 rounded-full bg-deep animate-twinkle" />
            <span className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-steel animate-twinkle" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="AstroLabs & Co. Home">
          <img src={logo} alt="AstroLabs & Co. web design studio" className="h-8 w-8" />
          <span className="font-display font-bold">AstroLabs & Co.</span>
        </a>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="hover:text-white transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} AstroLabs & Co. All rights reserved.</p>
      </div>
    </footer>
  );
}

function ChatTeaser() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("chat-teaser-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 2500);

    const markDismissed = () => {
      setDismissed(true);
      try {
        sessionStorage.setItem("chat-teaser-dismissed", "1");
      } catch {}
    };

    const isWidgetEl = (el: Element | null) => {
      while (el && el !== document.body) {
        if (el.closest('[data-chat-teaser="1"]')) return false;
        const tag = el.tagName?.toLowerCase();
        if (tag === "iframe") {
          const src = (el as HTMLIFrameElement).src || "";
          if (src.includes("crm.astrolabs") || src.includes("325d2056")) return true;
        }
        const id = (el.id || "").toLowerCase();
        const cls = typeof el.className === "string" ? el.className.toLowerCase() : "";
        if (
          id.includes("widget") || id.includes("chat") ||
          cls.includes("widget") || cls.includes("chat") ||
          el.hasAttribute("data-studio")
        ) return true;
        el = el.parentElement;
      }
      return false;
    };

    const onClick = (e: MouseEvent) => {
      if (isWidgetEl(e.target as Element)) markDismissed();
    };
    document.addEventListener("click", onClick, true);

    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setDismissed(true);
      try {
        sessionStorage.setItem("chat-teaser-dismissed", "1");
      } catch {}
    }, 16000);
    return () => clearTimeout(t);
  }, [visible]);

  if (dismissed || !visible) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("chat-teaser-dismissed", "1");
    } catch {}
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 max-w-[260px] animate-fade-up sm:bottom-28 sm:right-6" data-chat-teaser="1">
      <div className="relative rounded-2xl border border-steel/30 bg-deep/95 px-4 py-3 pr-8 text-sm text-white shadow-xl shadow-navy/20 backdrop-blur">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-2 text-white/60 transition hover:text-white"
        >
          ×
        </button>
        <p className="font-medium">👋 Want to chat?</p>
        <p className="mt-1 text-xs text-white/70">
          Ask us anything — we usually reply in minutes.
        </p>
        <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r border-steel/30 bg-deep/95" />
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <SectionCurve fill="var(--color-background)" bg="transparent" tintPct={5} />
        <Services />
        <SectionCurve fill="transparent" bg="color-mix(in oklab, var(--steel) 5%, var(--background))" flip />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {/* ChatTeaser disabled — uncomment below to re-enable */}
      {/* <ChatTeaser /> */}
      <AccessibilityWidget />
    </div>

  );
}
