import { useState } from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import type { PlaceResult } from "./AddressAutocomplete";
import type { GoogleMapsStatus } from "../hooks/useGoogleMaps";

interface CashOfferFormProps {
  mapsStatus: GoogleMapsStatus;
  onSubmit: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  comments: string;
  consent: boolean;
}

type FieldName = "name" | "phone" | "email" | "address" | "consent";

function validate(form: FormState, selectedPlace: PlaceResult | null) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (digits.length < 10) errors.phone = "Enter a valid 10-digit phone number.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!selectedPlace) errors.address = "Property address is required.";
  if (!form.consent) errors.consent = "You must agree to be contacted.";
  return errors;
}

const ZAPIER_URL = "https://hooks.zapier.com/hooks/catch/25065754/4oqx22u/";

const inputBase =
  "w-full px-5 py-4 rounded-xl bg-white border text-[#1A1A1A] text-base focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400 transition-colors";

export function CashOfferForm({ mapsStatus, onSubmit }: CashOfferFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    comments: "",
    consent: false,
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(form, selectedPlace);
  const showError = (field: string) =>
    (touched[field] || submitAttempted) && errors[field as FieldName];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const [firstName, ...rest] = form.name.trim().split(" ");
    const lastName = rest.join(" ") || "";

    try {
      await fetch(ZAPIER_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          firstName,
          lastName,
          email: form.email,
          phoneNumber: form.phone,
          address: selectedPlace?.address ?? "",
          comment: form.comments,
          submittedAt: new Date().toISOString(),
          source: "flfasthomesale.com",
        }),
      });
    } catch {
      // proceed even if webhook fails
    }

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "offer_form_submit", form_name: "cash_offer" });
    }

    setSubmitting(false);
    onSubmit();
  };

  const fieldClass = (field: string) =>
    `${inputBase} ${showError(field) ? "border-red-400 focus:ring-red-400" : "border-gray-200"}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-lg mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] text-center mb-8">
        Get Your Cash Offer Today
      </h2>

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
            className={fieldClass("name")}
          />
          {showError("name") && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
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
          {showError("phone") && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
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
          {showError("email") && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Property Address */}
        <div>
          <AddressAutocomplete
            mapsStatus={mapsStatus}
            onSelect={setSelectedPlace}
            placeholder="Property Address"
            inputClassName={`bg-white border-gray-200 rounded-xl py-4 ${showError("address") ? "border-red-400 focus:ring-red-400" : ""}`}
          />
          {showError("address") && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>

        {/* Comments */}
        <div>
          <textarea
            name="comments"
            placeholder="Comments"
            value={form.comments}
            onChange={handleChange}
            rows={4}
            className={`${inputBase} border-gray-200 resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-5 bg-black text-white font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "GET MY CASH OFFER"}
        </button>

        {/* Consent */}
        <div className="space-y-1">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={form.consent}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-0.5 w-4 h-4 rounded accent-black flex-shrink-0 cursor-pointer"
            />
            <label htmlFor="consent" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
              I agree to be contacted by Florida Fast Home Sale via call, email, and text. To opt-out,
              reply 'stop' at any time or click unsubscribe. Message and data rates may apply.{" "}
              <a href="#" className="underline text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
            </label>
          </div>
          {showError("consent") && <p className="text-xs text-red-500">{errors.consent}</p>}
        </div>
      </form>
    </div>
  );
}
