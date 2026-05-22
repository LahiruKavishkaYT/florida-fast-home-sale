import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";
import type { GoogleMapsStatus } from "../hooks/useGoogleMaps";

// ─── Public result type (used by parent forms) ───────────────────────────────

export interface PlaceResult {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

// ─── Internal types ──────────────────────────────────────────────────────────

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

// ─── Debounce hook ───────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface AddressAutocompleteProps {
  mapsStatus: GoogleMapsStatus;
  onSelect: (place: PlaceResult) => void;
  placeholder?: string;
  inputClassName?: string;
}

export function AddressAutocomplete({
  mapsStatus,
  onSelect,
  placeholder = "Enter your home address",
  inputClassName = "",
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);

  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const hiddenDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Initialise Google services once the script is ready
  useEffect(() => {
    if (mapsStatus !== "ready") return;
    if (!google?.maps?.places?.AutocompleteService) return;
    autocompleteService.current = new google.maps.places.AutocompleteService();
    if (hiddenDivRef.current) {
      placesService.current = new google.maps.places.PlacesService(hiddenDivRef.current);
    }
  }, [mapsStatus]);

  // Fetch predictions on debounced query change
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3 || !autocompleteService.current) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    setIsFetching(true);
    autocompleteService.current.getPlacePredictions(
      {
        input: debouncedQuery,
        componentRestrictions: { country: "us" },
        types: ["address"],
      },
      (results, status) => {
        setIsFetching(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results as unknown as Prediction[]);
          setIsOpen(true);
          setActiveIndex(-1);
        } else {
          setPredictions([]);
          setIsOpen(false);
        }
      }
    );
  }, [debouncedQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectPrediction = useCallback(
    (pred: Prediction) => {
      setQuery(pred.description);
      setIsOpen(false);
      setPredictions([]);

      if (!placesService.current) return;

      placesService.current.getDetails(
        { placeId: pred.place_id, fields: ["geometry", "formatted_address"] },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            onSelect({
              address: place.formatted_address ?? pred.description,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              placeId: pred.place_id,
            });
          }
        }
      );
    },
    [onSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, predictions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          selectPrediction(predictions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      {/* PlacesService requires a DOM node — keep it hidden */}
      <div ref={hiddenDivRef} className="hidden" aria-hidden="true" />

      {/* Input */}
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1B0A1] pointer-events-none z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => predictions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Home address"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-activedescendant={activeIndex >= 0 ? `ac-option-${activeIndex}` : undefined}
          className={`w-full pl-11 pr-10 py-4 rounded-2xl bg-[#F8FAF8] border border-[#E1EADB] text-[#1A3018] focus:outline-none focus:ring-2 focus:ring-[#2D5A27] placeholder:text-[#A1B0A1] ${inputClassName}`}
        />
        {isFetching && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1B0A1] animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && predictions.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-[#1A3018] rounded-2xl border border-[#2D5A27]/30 shadow-2xl overflow-hidden z-50"
        >
          {predictions.map((pred, i) => (
            <li
              key={pred.place_id}
              id={`ac-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => selectPrediction(pred)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                i === activeIndex ? "bg-[#2D5A27]" : "hover:bg-[#243d20]"
              } ${i < predictions.length - 1 ? "border-b border-white/[0.06]" : ""}`}
            >
              <MapPin className="w-4 h-4 text-[#A1B0A1] flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium leading-snug truncate">
                  {pred.structured_formatting.main_text}
                </p>
                <p className="text-[#94A194] text-xs mt-0.5 truncate">
                  {pred.structured_formatting.secondary_text}
                </p>
              </div>
            </li>
          ))}
          {/* Required Google attribution */}
          <li className="flex justify-end px-4 py-2 border-t border-white/[0.06]">
            <span className="text-[#5C6B5C] text-[10px] tracking-wide">Powered by Google</span>
          </li>
        </ul>
      )}
    </div>
  );
}
