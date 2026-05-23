import { useState } from "react";
import { Logo } from "./Logo";
import { Phone } from "lucide-react";

interface OfferFormProps {
  address: string;
  onSubmit: () => void;
  onBack: () => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  notes: string;
  consent: boolean;
}

type FieldName = keyof Omit<FormState, "notes" | "consent">;

function validate(form: FormState) {
  const errors: Partial<Record<FieldName | "consent", string>> = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (digits.length < 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!form.homeAddress.trim()) errors.homeAddress = "Address is required.";
  if (!form.consent) errors.consent = "You must agree to be contacted.";

  return errors;
}

const inputBase =
  "w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border text-[#1A3018] text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] placeholder:text-[#A1B0A1] transition-colors";

export function OfferForm({ address, onSubmit, onBack }: OfferFormProps) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeAddress: address,
    notes: "",
    consent: false,
  });

  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = validate(form);
  const showError = (field: string) =>
    (touched[field] || submitAttempted) && errors[field as FieldName];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25065754/4oqx22u/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phoneNumber: form.phone,
          address: form.homeAddress,
          comment: form.notes,
          submittedAt: new Date().toISOString(),
          source: "flfasthomesale.com",
        }),
      });
    } catch {
      // Proceed even if webhook fails so the user isn't blocked
    }

    setSubmitting(false);
    onSubmit();
  };

  const fieldClass = (field: string) =>
    `${inputBase} ${showError(field) ? "border-red-400 focus:ring-red-400" : "border-[#E1EADB]"}`;

  return (
    <div className="min-h-screen font-sans bg-[#FDFBF7] text-[#2D3A2D] relative flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/92 backdrop-blur-[2px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 w-full bg-white/50 backdrop-blur-md border-b border-[#E1EADB] pb-2 pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={onBack} className="flex-shrink-0 focus:outline-none">
            <Logo className="h-10 sm:h-14 w-auto" />
          </button>
          <a
            href="tel:6892202289"
            className="hidden sm:block bg-[#2D5A27] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1E3D1A] transition-colors"
          >
            Call Us: (689) 220-2289
          </a>
          <a
            href="tel:6892202289"
            className="sm:hidden bg-[#2D5A27] text-white px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1E3D1A] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
        </div>
      </nav>

      {/* Form card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-[#E1EADB] p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A3018] mb-2">
              Get Your Cash Offer
            </h1>
            <p className="text-sm text-[#5C6B5C]">
              Fill in your details below and we'll reach out within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <p className="text-xs text-[#C05000] font-medium">
              "*" indicates required fields
            </p>

            {/* Name row */}
            <div>
              <label className="block text-[10px] font-bold text-[#5C6B5C] tracking-widest uppercase mb-2">
                Name <span className="text-[#C05000]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First"
                    value={form.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass("firstName")}
                  />
                  {showError("firstName") && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last"
                    value={form.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass("lastName")}
                  />
                  {showError("lastName") && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-[#5C6B5C] tracking-widest uppercase mb-2">
                Email <span className="text-[#C05000]">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass("email")}
              />
              {showError("email") && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-bold text-[#5C6B5C] tracking-widest uppercase mb-2">
                Phone <span className="text-[#C05000]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass("phone")}
              />
              {showError("phone") && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Home Address */}
            <div>
              <label className="block text-[10px] font-bold text-[#5C6B5C] tracking-widest uppercase mb-2">
                Your Home Address <span className="text-[#C05000]">*</span>
              </label>
              <input
                type="text"
                name="homeAddress"
                value={form.homeAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass("homeAddress")}
              />
              {showError("homeAddress") && (
                <p className="mt-1 text-xs text-red-500">{errors.homeAddress}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-bold text-[#5C6B5C] tracking-widest uppercase mb-2">
                Tell Us About Your Home{" "}
                <span className="normal-case font-normal tracking-normal text-[#A1B0A1]">
                  (optional)
                </span>
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                className={`${inputBase} border-[#E1EADB] resize-none`}
              />
            </div>

            {/* Consent */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-4 h-4 rounded accent-[#2D5A27] flex-shrink-0 cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs text-[#5C6B5C] leading-relaxed cursor-pointer">
                  I agree to be contacted by Florida Fast Home Sale via call,
                  email, and text. To opt-out, you can reply 'stop' at any time
                  or click the unsubscribe link in the emails. Message and data
                  rates may apply.{" "}
                  <a href="#" className="font-bold text-[#1A3018] hover:text-[#2D5A27]">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {showError("consent") && (
                <p className="mt-1 text-xs text-red-500">{errors.consent}</p>
              )}
            </div>

            {/* Submit */}
            {submitError && (
              <p className="text-xs text-red-500 text-center">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#2D5A27] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 hover:bg-[#1E3D1A] transition-colors text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Get Your Offer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
