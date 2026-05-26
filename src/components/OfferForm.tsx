import { useState } from "react";
import { Logo } from "./Logo";
import { Phone } from "lucide-react";

interface OfferFormProps {
  address: string;
  onSubmit: () => void;
  onBack: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  propertyAddress: string;
  comments: string;
}

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (form.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.propertyAddress.trim()) errors.propertyAddress = "Property address is required.";
  return errors;
}

export function OfferForm({ address, onSubmit, onBack }: OfferFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    propertyAddress: address,
    comments: "",
  });
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(form);
  const showError = (field: string) =>
    (touched[field] || submitAttempted) && errors[field as keyof FormState];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25065754/4oqx22u/", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          name: form.name,
          phoneNumber: form.phone,
          email: form.email,
          address: form.propertyAddress,
          comment: form.comments,
          submittedAt: new Date().toISOString(),
          source: "flfasthomesale.com",
        }),
      });
    } catch {
      // Proceed even if webhook fails
    }
    setSubmitting(false);
    onSubmit();
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-2xl border text-[#1A1A1A] text-sm bg-white placeholder:text-[#ABABAB] focus:outline-none focus:ring-2 transition-colors ${
      showError(field)
        ? "border-red-400 focus:ring-red-300"
        : "border-[#E0E0E0] focus:ring-[#1A1A1A]/20"
    }`;

  return (
    <div className="min-h-screen font-sans relative flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 w-full bg-black/30 backdrop-blur-md border-b border-white/10 pb-2 pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={onBack} className="flex-shrink-0 focus:outline-none">
            <Logo className="h-10 sm:h-14 w-auto" inverted />
          </button>
          <a
            href="tel:3214750983"
            className="hidden sm:block bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Call Us: (321) 475-0983
          </a>
          <a
            href="tel:3214750983"
            className="sm:hidden bg-white text-[#1A1A1A] px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
        </div>
      </nav>

      {/* Form card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1A1A] text-center mb-8">
            Get Your Cash Offer Today
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("name")}
              />
              {showError("name") && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("phone")}
              />
              {showError("phone") && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("email")}
              />
              {showError("email") && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Property Address */}
            <div>
              <input
                type="text"
                name="propertyAddress"
                placeholder="Property Address"
                value={form.propertyAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("propertyAddress")}
              />
              {showError("propertyAddress") && (
                <p className="mt-1 text-xs text-red-500">{errors.propertyAddress}</p>
              )}
            </div>

            {/* Comments */}
            <div>
              <textarea
                name="comments"
                placeholder="Comments"
                value={form.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 rounded-2xl border border-[#E0E0E0] text-[#1A1A1A] text-sm bg-white placeholder:text-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-5 bg-[#1A1A1A] text-white font-bold rounded-2xl text-sm tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Get My Cash Offer"}
            </button>

            <p className="text-center text-xs text-[#ABABAB] pt-1">
              This field is for validation purposes and should be left unchanged.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
