import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import logo from "@/assets/astrolabs-logo.png";
import goodVibesImg from "@/assets/portfolio-goodvibes.jpg";
import puddingsImg from "@/assets/portfolio-puddings.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  // { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "CRM", href: "https://crm.astrolabs.uk" },
];

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
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img src={logo} alt="AstroLabs & Co." className="h-9 w-9 transition-transform group-hover:rotate-12" />
          <span className="font-display font-bold text-navy text-lg tracking-tight">AstroLabs <span className="text-steel">& Co.</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  const stars = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 55 }, (_, i) => {
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
  }, [mounted]);

  const brightStars = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      top: 10 + Math.random() * 80,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-steel/15 border border-steel/30 text-navy text-xs font-medium mb-8 animate-badge-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-deep animate-twinkle" />
          UK-based web design studio
        </div>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-navy leading-[0.95]">
          <span className="text-shimmer">AstroLabs</span> <span className="text-steel">& Co.</span>
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-display font-medium text-deep">
          We Build. You Grow.
        </p>
        <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed">
          Professional websites for local businesses across the UK. No jargon, no hidden fees, just results.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#portfolio" className="btn-comet px-7 py-3.5 rounded-lg bg-deep text-white font-medium hover:bg-navy transition-all hover:-translate-y-0.5 shadow-lg shadow-deep/20">
            See Our Work
          </a>
          <a href="#contact" className="px-7 py-3.5 rounded-lg bg-white text-deep font-medium border border-steel/40 hover:border-deep hover:-translate-y-0.5 transition-all">
            Get a Quote
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

function About() {
  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      num: "2", label: "Sites Launched",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
      num: "3", label: "Pricing Plans",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      num: "1", label: "Year Support Included",
    },
  ];
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="About" title="Who We Are" />
        <p className="text-lg md:text-xl text-center text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          We're a small UK-based web studio that helps local businesses get online and look great doing it. We handle everything — design, build, and hosting — so you can focus on running your business.
        </p>
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="p-8 rounded-2xl bg-white border border-border hover:border-steel transition-all hover:-translate-y-1 text-center">
              <div className="mb-3 flex justify-center text-deep">{s.icon}</div>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 19l7-7-7-7M5 19l7-7-7-7" />
        </svg>
      ),
      title: "Design",
      desc: "Custom websites built to reflect your brand and stand out from the crowd.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Hosting",
      desc: "Fast, reliable, free hosting on our end — no extra invoices to worry about.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Support",
      desc: "1 year of bug fixes and updates included with every build.",
    },
  ];
  return (
    <section id="services" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Services" title="What We Do" />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((s) => (
            <div key={s.title} className="group p-8 rounded-2xl bg-background border border-border hover:bg-deep hover:border-deep transition-all duration-300 hover:-translate-y-1">
              <div className="mb-5 text-deep group-hover:text-white transition-colors">{s.icon}</div>
              <h3 className="font-display font-bold text-2xl text-navy group-hover:text-white transition-colors">{s.title}</h3>
              <p className="mt-3 text-foreground/70 group-hover:text-white/80 leading-relaxed transition-colors">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Portfolio" title="Our Work" />
        <div className="grid md:grid-cols-2 gap-8">
          <article className="group rounded-2xl overflow-hidden bg-white border border-border hover:shadow-xl hover:shadow-navy/10 transition-all hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={goodVibesImg} alt="Good Vibes Café website" width={1024} height={768} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-7">
              <h3 className="font-display font-bold text-2xl text-navy">Good Vibes Café</h3>
              <p className="mt-2 text-foreground/70">First Portfolio Website Design</p>
              <a href="https://good-vibes.astrolabs.uk" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep text-white text-sm font-medium hover:bg-navy transition-colors">
                Visit Site →
              </a>
            </div>
          </article>
          <article className="group rounded-2xl overflow-hidden bg-white border border-border hover:shadow-xl hover:shadow-navy/10 transition-all hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={puddingsImg} alt="Puddings Maidstone website" width={1024} height={768} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-7">
              <h3 className="font-display font-bold text-2xl text-navy">Puddings Maidstone</h3>
              <p className="mt-2 text-foreground/70">Second Portfolio Website Design</p>
              <a href="https://puddings.astrolabs.uk" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep text-white text-sm font-medium hover:bg-navy transition-colors">
                Visit Site →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

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
    <section id="pricing" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Pricing" title="Simple, Transparent Pricing" />
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-8 rounded-2xl flex flex-col transition-all hover:-translate-y-1 ${
                p.popular
                  ? "bg-deep text-white border-2 border-deep shadow-2xl shadow-deep/20 md:scale-105"
                  : "bg-background border border-border hover:border-steel"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-steel text-white text-xs font-semibold tracking-wide">
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
                    <span className={p.popular ? "text-steel" : "text-deep"}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 text-center px-5 py-3 rounded-lg font-medium transition-all ${
                  p.popular
                    ? "bg-white text-deep hover:bg-steel hover:text-white"
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

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch("https://formspree.io/f/xpqnaarq", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSent(true);
    setSending(false);
    form.reset();
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="Contact" title="Let's Build Something" />
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-border">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-deep transition" />
            <input name="business" required placeholder="Business name" className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-deep transition" />
          </div>
          <input name="email" required type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-deep transition" />
          <textarea name="message" required rows={5} placeholder="Tell us about your project…" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-deep transition resize-none" />
          <button type="submit" disabled={sending} className="w-full px-6 py-3.5 rounded-lg bg-deep text-white font-medium hover:bg-navy transition-all hover:-translate-y-0.5">
            {sent ? "Thanks — we'll be in touch ✦" : sending ? "Sending…" : "Send Message"}
          </button>
        </form>
        <p className="mt-6 text-center text-foreground/70">
          Or email us directly at{" "}
          <a href="https://mail.google.com/mail/?view=cm&to=hello@astrolabs.uk" className="text-deep font-medium hover:underline">hello@astrolabs.uk</a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="font-display font-bold">AstroLabs & Co.</span>
        </a>
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
        <p className="text-xs text-white/60">© {new Date().getFullYear()} AstroLabs & Co.™ All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        {/* <Portfolio /> */}
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}