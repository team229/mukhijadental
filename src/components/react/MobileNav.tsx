import { useState } from "react";
import { navigation } from "../../data/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-brand hover:bg-surface transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div class="fixed inset-0 top-14 z-40 bg-white overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-700 hover:bg-surface rounded-lg"
                  >
                    {item.label}
                    <span className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {expanded === item.label && (
                    <div className="pl-4 space-y-1 pb-2">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-accent hover:bg-surface rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 font-medium text-slate-700 hover:bg-surface rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="/contact-us/"
              className="block mt-4 px-4 py-3 bg-accent text-white text-center font-semibold rounded-full"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
