import { useEffect, useRef, useState } from "react";

type Settings = {
  reduceMotion: boolean;
  textSize: "default" | "large" | "xlarge";
  removeStyling: boolean;
};

const DEFAULTS: Settings = {
  reduceMotion: false,
  textSize: "default",
  removeStyling: false,
};

const STORAGE_KEY = "astrolabs-a11y";

function applySettings(s: Settings) {
  if (typeof document === "undefined") return;
  const b = document.body;
  b.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  b.classList.toggle("a11y-text-large", s.textSize === "large");
  b.classList.toggle("a11y-text-xlarge", s.textSize === "xlarge");
  b.classList.toggle("a11y-no-styling", s.removeStyling);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const reset = () => setSettings(DEFAULTS);

  return (
    <div ref={panelRef} className="fixed bottom-4 right-4 z-[60] print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="mb-3 w-72 rounded-2xl border border-[color-mix(in_oklab,var(--steel)_35%,transparent)] bg-[color:var(--background)]/95 p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[color:var(--navy)]">
              Accessibility
            </h2>
            <button
              onClick={reset}
              className="rounded-md border border-[color-mix(in_oklab,var(--steel)_40%,transparent)] px-2 py-1 text-xs font-medium text-[color:var(--deep)] hover:bg-[color-mix(in_oklab,var(--steel)_12%,transparent)]"
            >
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm text-[color:var(--foreground)]">
              <span>Reduce motion</span>
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, reduceMotion: e.target.checked }))
                }
                className="h-4 w-4 accent-[color:var(--deep)]"
              />
            </label>

            <div className="text-sm">
              <div className="mb-1.5 text-[color:var(--foreground)]">Text size</div>
              <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Text size">
                {(["default", "large", "xlarge"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSettings((s) => ({ ...s, textSize: size }))}
                    aria-pressed={settings.textSize === size}
                    className={
                      "rounded-md border px-2 py-1 text-xs font-medium transition-colors " +
                      (settings.textSize === size
                        ? "border-[color:var(--deep)] bg-[color:var(--deep)] text-white"
                        : "border-[color-mix(in_oklab,var(--steel)_40%,transparent)] text-[color:var(--deep)] hover:bg-[color-mix(in_oklab,var(--steel)_12%,transparent)]")
                    }
                  >
                    {size === "default" ? "A" : size === "large" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between gap-3 text-sm text-[color:var(--foreground)]">
              <span>Remove styling</span>
              <input
                type="checkbox"
                checked={settings.removeStyling}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, removeStyling: e.target.checked }))
                }
                className="h-4 w-4 accent-[color:var(--deep)]"
              />
            </label>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--deep)] text-white shadow-lg ring-2 ring-white/40 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--steel)_60%,transparent)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="4" r="2" />
          <path d="M20.5 8.5a1 1 0 0 0-1.2-.75L15 8.7a12 12 0 0 1-6 0L4.7 7.75a1 1 0 1 0-.4 1.96L8 10.6v2.1l-2.1 6.6a1 1 0 1 0 1.9.6L9.6 14h4.8l1.8 5.9a1 1 0 1 0 1.9-.6L16 12.7v-2.1l3.7-.94a1 1 0 0 0 .8-1.16z" />
        </svg>
      </button>
    </div>
  );
}
