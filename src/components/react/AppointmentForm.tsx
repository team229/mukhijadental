import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { procedures, appointmentTimes } from "../../data/site";

const FORM_ENDPOINT = "https://api-inform.bythub.in/?formId=lXoGeEiezcdQwijDeuc8";

type Status = "idle" | "submitting" | "success" | "error";

export default function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(e.currentTarget);
    const payload = {
      name: (data.get("name") as string) || "",
      email: (data.get("email") as string) || "",
      phone: (data.get("phone") as string) || "",
      procedure: (data.get("procedure") as string) || "",
      date: (data.get("date") as string) || "",
      time: (data.get("time") as string) || "",
      message: (data.get("message") as string) || "",
    };

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      await res.json().catch(() => null);
      window.location.href = "/thank-you/";
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  }

  return (
    <div className={`bg-white rounded-3xl shadow-2xl border border-slate-100 ${compact ? "p-6" : "p-8"} relative overflow-hidden w-full`}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />

      <div className="mb-6">
        <h3 className="font-display font-bold text-brand text-2xl mb-1">Book Your Visit</h3>
        <p className="text-xs text-muted">Fill out the form below and we will contact you immediately.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Select Procedure *</label>
            <select
              required
              name="procedure"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <option value="">Choose procedure</option>
              {procedures.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Preferred Date</label>
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Preferred Time</label>
            <select
              name="time"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <option value="">Choose time slot</option>
              {appointmentTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Message / Special Instructions</label>
          <textarea
            name="message"
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm resize-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
            placeholder="Tell us about your symptoms or preferences..."
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
            Something went wrong. Please try again, or call us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-accent/20 cursor-pointer text-center text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </>
          ) : (
            "Book Appointment Now"
          )}
        </button>
      </form>
    </div>
  );
}
