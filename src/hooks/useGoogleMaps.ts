import { useState, useEffect } from "react";

export type GoogleMapsStatus = "idle" | "loading" | "ready" | "error";

const SCRIPT_ID = "google-maps-js";

function getInitialStatus(): GoogleMapsStatus {
  if (typeof window === "undefined") return "idle";
  if (typeof google !== "undefined" && google.maps?.places) return "ready";
  if (document.getElementById(SCRIPT_ID)) return "loading";
  return "idle";
}

export function useGoogleMaps(): GoogleMapsStatus {
  const [status, setStatus] = useState<GoogleMapsStatus>(getInitialStatus);

  useEffect(() => {
    if (status === "ready" || status === "error") return;

    // Script already injected by a previous render (React StrictMode double-invoke)
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => setStatus("ready"));
      existing.addEventListener("error", () => setStatus("error"));
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!apiKey) {
      console.error(
        "[AddressAutocomplete] VITE_GOOGLE_MAPS_API_KEY is not set. " +
          "Add it to your .env file and restart the dev server."
      );
      setStatus("error");
      return;
    }

    setStatus("loading");

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("error");

    document.head.appendChild(script);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return status;
}
