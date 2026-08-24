import { useState } from "react";
import { navigation, siteConfig } from "../../data/site";
import { Phone, ChevronDown } from "lucide-react";

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
        aria-expanded={open}
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
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 bg-white overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-5 space-y-1" aria-label="Mobile navigation">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-700 hover:bg-surface rounded-xl transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {expanded === item.label && (
                    <div className="pl-4 pt-1 space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-accent hover:bg-surface rounded-xl transition-colors"
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
                  className="block px-4 py-3 font-medium text-slate-700 hover:bg-surface rounded-xl transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}

            <div className="pt-5 mt-4 border-t border-slate-200 space-y-2">
              <a
                href="/contact-us/"
                className="block px-4 py-3.5 bg-accent hover:bg-accent-light text-white text-center font-semibold rounded-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-brand hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" /> {siteConfig.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
