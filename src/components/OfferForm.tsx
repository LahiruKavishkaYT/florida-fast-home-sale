import { useState } from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import type { PlaceResult } from "./AddressAutocomplete";
import type { GoogleMapsStatus } from "../hooks/useGoogleMaps";

interface OfferFormProps {
  mapsStatus: GoogleMapsStatus;
  onSubmit: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

function validate(form: FormState, address: string) {
  const errors: Partial<Record<string, string>> = {};
  if (!form.name.trim()) errors.name = "Name is required.";
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
  if (!address.trim()) errors.homeAddress = "Address is required.";
  if (!form.consent) errors.consent = "You must agree to be contacted.";
  return errors;
}

const inputBase =
  "w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-[#1A3018] text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] placeholder:text-gray-400 transition-colors";

export function OfferForm({ mapsStatus, onSubmit }: OfferFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    notes: "",
    consent: false,
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(form, selectedPlace?.address ?? "");
  const showError = (field: string) =>
    (touched[field] || submitAttempted) && errors[field];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25065754/4oqx22u/", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          firstName,
          lastName,
          email: form.email,
          phoneNumber: form.phone,
          address: selectedPlace?.address ?? "",
          comment: form.notes,
          submittedAt: new Date().toISOString(),
          source: "flfasthomesale.com",
        }),
      });
    } catch {
      // proceed even if webhook fails
    }

    setSubmitting(false);
    onSubmit();
  };

  const fieldClass = (field: string) =>
    `${inputBase} ${showError(field) ? "border-red-400 focus:ring-red-400" : ""}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h2 className="text-xl font-bold text-center text-[#1A3018] mb-6">
        Get Your Cash Offer Today
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("name")}
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
            className={fieldClass("phone")}
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
            className={fieldClass("email")}
          />
          {showError("email") && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <AddressAutocomplete
            mapsStatus={mapsStatus}
            onSelect={setSelectedPlace}
            placeholder="Address"
            inputClassName="!rounded-lg !py-3 !bg-white !border-gray-200"
          />
          {showError("homeAddress") && (
            <p className="mt-1 text-xs text-red-500">{errors.homeAddress}</p>
          )}
        </div>

        {/* Comments */}
        <div>
          <textarea
            name="notes"
            placeholder="Comments"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 pt-1 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-0.5 w-4 h-4 rounded accent-[#2D5A27] flex-shrink-0"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            I agree to be contacted by Florida Fast Home Sale via call, email,
            and text. To opt-out, reply 'stop' at any time.{" "}
            <a href="#" className="underline text-[#1A3018]">
              Privacy Policy
            </a>
          </span>
        </label>
        {showError("consent") && (
          <p className="text-xs text-red-500">{errors.consent}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-black text-white font-bold rounded-lg uppercase tracking-widest text-sm hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {submitting ? "Submitting…" : "Get My Cash Offer"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-1">
          This field is for validation purposes and should be left unchanged.
        </p>
      </form>
    </div>
  );
}
