import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { procedures, appointmentTimes } from "../../data/site";

export default function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-600" />
        </div>
        <h3 className="font-display font-bold text-emerald-950 text-xl mb-2">Appointment Request Sent!</h3>
        <p className="text-emerald-700 text-sm max-w-sm mx-auto">Thank you for choosing Mukhija Dental Clinic. Our team will contact you shortly to confirm your booking.</p>
      </div>
    );
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
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Phone Number *</label>
            <input
              type="tel"
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
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Select Procedure *</label>
            <select
              required
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
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-dark uppercase tracking-wider mb-1">Preferred Time</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors">
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
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm resize-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
            placeholder="Tell us about your symptoms or preferences..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-accent/20 cursor-pointer text-center text-sm uppercase tracking-wider"
        >
          Book Appointment Now
        </button>
      </form>
    </div>
  );
}
