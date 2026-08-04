import { useEffect, useState } from "react";

const KEY = "astrolabs-privacy-agreed";

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const agree = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Privacy policy notice"
      className="animate-consent-rise fixed bottom-4 left-1/2 z-[55] w-[min(22rem,calc(100vw-8rem))] -translate-x-1/2 print:hidden"
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-[color-mix(in_oklab,var(--steel)_35%,transparent)] bg-[color:var(--background)]/95 px-4 py-2 shadow-lg backdrop-blur-md">
        <p className="text-xs text-foreground/80">
          Please read our{" "}
          <a href="/privacy" className="font-medium text-deep underline">
            privacy policy
          </a>
          .
        </p>
        <button
          type="button"
          onClick={agree}
          className="shrink-0 rounded-full bg-deep px-3 py-1.5 text-xs font-medium text-white transition hover:bg-navy"
        >
          I agree
        </button>
      </div>
    </div>
  );
}
